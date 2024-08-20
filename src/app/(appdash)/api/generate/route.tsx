import * as dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { storage } from "../../../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import fs from 'fs/promises';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const systemprompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards for various subjects. Each flashcard should have a clear and focused question on the front and a precise, well-explained answer on the back.

Guidelines for creating flashcards:
1. **Clarity**: Ensure that each question is straightforward and unambiguous.
2. **Focus**: Cover one concept or idea per flashcard to avoid confusion.
3. **Brevity**: Keep the content concise, but informative. The answer should be thorough yet to the point.
4. **Variety**: Use different types of questions such as definitions, explanations, comparisons, and examples to keep the flashcards engaging.
5. **Contextual Information**: Provide necessary context in the answer to aid understanding, but avoid unnecessary details.
6. **Visual Aids**: Where appropriate, suggest images, charts, or diagrams that could help visualize the concept.

Structure:
- **Front (Question)**: A direct question or prompt.
- **Back (Answer)**: A clear and concise answer, with any necessary explanation or additional context.

Create flashcards that are informative, clear, and easy to memorize. Focus on key concepts and core knowledge areas relevant to the subject matter.

Return specifically in the JSON format below:

\`\`\`
{
  flashcards: [
    {
      front: string,
      back: string
    }
  ]
}
\`\`\`
`;

interface Flashcard {
  front: string;
  back: string;
}

interface Flashcards {
  flashcards: Flashcard[];
}

/**
 * Handles the POST request for generating flashcards.
 *
 * @param request - The request object.
 * @returns A JSON response containing the generated flashcards.
 */
export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const type = searchParams.get("type");
    console.log("Request type:", type);

    if (type === "prompt") {
      const prompt = await request.text();
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemprompt },
          { role: "user", content: prompt },
        ],
        model: "llama3-8b-8192",
        response_format: { type: "json_object" },
      });

      const flashcards = JSON.parse(chatCompletion.choices[0].message.content || "{}");
      console.log("Generated flashcards:", flashcards);
      return NextResponse.json(flashcards.flashcards || []);
    } else {
      const { fileName, downloadURL } = await request.json();
      console.log("Received fileName:", fileName);
      console.log("Received downloadURL:", downloadURL);

      if (!fileName || !downloadURL) {
        throw new Error("No file name or download URL provided");
      }

      // Fetch the file content from Firebase Storage
      const response = await axios.get(downloadURL, { responseType: 'arraybuffer' });
      const arrayBuffer = response.data;

      // Convert ArrayBuffer to Blob
      const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

      // Use the appropriate loader based on file type
      let docs;
      if (fileName.endsWith('.pdf')) {
        const loader = new PDFLoader(blob);
        docs = await loader.load();
      } else if (fileName.endsWith('.docx')) {
        // For DOCX files, we might need to use a different approach
        // This depends on the capabilities of your DocxLoader
        throw new Error("DOCX files are not supported yet");
      } else {
        throw new Error("Unsupported file type");
      }

      console.log("Loaded document chunks:", docs.length);

      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 2000,
        chunkOverlap: 200,
      });

      const splitDocs = await splitter.splitDocuments(docs);
      console.log("Split document chunks:", splitDocs.length);

      const finalFlashCards: Flashcard[] = [];

      for (const doc of splitDocs) {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            { role: "system", content: systemprompt },
            { role: "user", content: doc.pageContent },
          ],
          model: "llama3-8b-8192",
          response_format: { type: "json_object" },
        });

        const flashcards = JSON.parse(chatCompletion.choices[0].message.content || "{}") as Flashcards;
        finalFlashCards.push(...(flashcards.flashcards || []));
      }

      console.log("Generated flashcards:", finalFlashCards.length);
      return NextResponse.json(finalFlashCards);
    }
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json({ error: "An error occurred while processing the request" }, { status: 500 });
  }
}