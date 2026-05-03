import type { Metadata } from "next";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata: Metadata = {
  title: "Portfolio | φ",
  description: "A minimalist personal portfolio with Apple-inspired design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0a0a0a] text-[#fafafa] antialiased selection:bg-[#00A19C] selection:text-white">
        <ClientWrapper>
          <Navbar />
          <ScrollProgress />
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
