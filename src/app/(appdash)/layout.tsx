// components/layout.tsx
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { lightTheme, darkTheme } from "../../utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "./layout/header/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import { GoogleTagManager } from '@next/third-parties/google';

interface LayoutProps {
  children: React.ReactNode;
}

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  minHeight: '100vh',
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    setIsDarkMode(savedMode === 'true');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <title>MemorixAI Dashboard</title>
          <meta name="description" content="MemorixAI is a cutting-edge flashcard SaaS application designed to enhance your learning experience with AI-powered insights. Powered by Llama 3.1, MemorixAI intelligently generates personalized flashcards, adapting to your learning pace and style. Whether you're preparing for exams, mastering a new language, or simply trying to retain more information, MemorixAI offers a tailored approach to help you succeed." />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <GoogleTagManager gtmId="GTM-NL5QDMCL" />
        <body>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <MainWrapper className="mainwrapper">
              <Sidebar
                isSidebarOpen={isSidebarOpen}
                isMobileSidebarOpen={isMobileSidebarOpen}
                onSidebarClose={() => setMobileSidebarOpen(false)}
                isDarkMode={isDarkMode}
                toggleDarkMode={toggleDarkMode}
                toggleMobileSidebar={() => setMobileSidebarOpen(true)}
              />
              <PageWrapper className="page-wrapper">
                <Header toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
                <Container
                  sx={{
                    paddingTop: "20px",
                    maxWidth: "1200px",
                  }}
                >
                  <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                </Container>
              </PageWrapper>
            </MainWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default Layout;