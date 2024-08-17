// components/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ClerkProvider>
    <html lang="en">
      <head>
        <title>Dashboard</title>
      </head>
      <body>
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <aside
            style={{
              width: "250px",
              backgroundColor: "#333",
              color: "#fff",
              padding: "20px",
            }}
          >
            <h2>Dashboard</h2>
            <nav>
              <ul>
                <li>
                  <a href="/" style={{ color: "#fff", textDecoration: "none" }}>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/settings"
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </nav>
          </aside>
          <main
            style={{ flex: 1, padding: "20px", backgroundColor: "#f4f4f4" }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
};

export default Layout;
