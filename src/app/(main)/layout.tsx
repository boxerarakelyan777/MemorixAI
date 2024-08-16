import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "../../app/globals.css";
import Providers from "../../components/Providers";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MemorixAI",
  description: "Memorixaai is a cutting-edge flashcard SaaS application designed to enhance your learning experience with AI-powered insights. Powered by Llama 3.1 from Groq API, Memorixaai intelligently generates personalized flashcards, adapting to your learning pace and style. Whether you're preparing for exams, mastering a new language, or simply trying to retain more information, Memorixaai offers a tailored approach to help you succeed.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}