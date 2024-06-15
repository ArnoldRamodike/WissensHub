import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToasterProvider from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LMS",
  description: "Learning management system dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider/>
          <ToasterProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
