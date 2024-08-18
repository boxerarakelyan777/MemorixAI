import * as dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";

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
  //Print the search params
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.searchParams);
  console.log(searchParams.get("type"));

  if (searchParams.get("type") === "prompt") {
    try {
      // get the prompt from the request
      const prompt = await request.text();
      // Generate flashcards using the prompt and Groq chat completions
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemprompt,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
        response_format: { type: "json_object" },
      });

      const flashcards = JSON.parse(
        chatCompletion.choices[0].message.content || ""
      );
      console.log(flashcards);

      return NextResponse.json(flashcards.flashcards);
    } catch (error) {
      console.error(error);
    }
  } else {
    // Create the loader for the particular doument uploaded, then split the document to chunks
    const finalFlashCards: Flashcard[] = [];
    const documentExtension: String = searchParams.get("type") || "";
    const fileName = await request.text();
    let loader;
    if (documentExtension === "pdf") {
      loader = new PDFLoader(`./public/uploads/${fileName}`);
    } else if (documentExtension === "docx") {
      loader = new DocxLoader(`./public/uploads/${fileName}`);
    } else {
      loader = new UnstructuredLoader(`./public/uploads/${fileName}`);
    }

    const docs = await loader.load();
    const splittter = new RecursiveCharacterTextSplitter({
      chunkSize: 2000,
      chunkOverlap: 200,
    });
    const pageContentArray: string[] = [];
    for (const doc of docs) {
      const pageContent = doc.pageContent;
      pageContentArray.push(pageContent);
    }

    const splitDocs = await splittter.createDocuments(pageContentArray);

    // Generate the flashcards using each doucment chunk from the document uploaded
    for (const doc of splitDocs) {
      try {
        const chatCompletion = await groq.chat.completions.create({
          messages: [
            {
              role: "system",
              content: systemprompt,
            },
            {
              role: "user",
              content: doc.pageContent,
            },
          ],
          model: "llama3-8b-8192",
          response_format: { type: "json_object" },
        });

        const flashcards = JSON.parse(
          chatCompletion.choices[0].message.content || ""
        ) as Flashcards;

        for (const flashcard of flashcards.flashcards) {
          finalFlashCards.push(flashcard);
        }
      } catch (err) {
        console.log("Error: ", err);
      }
    }
    return NextResponse.json(finalFlashCards, { status: 200 });
  }
}
