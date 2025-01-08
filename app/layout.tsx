import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { StarknetProvider } from "@/components/starknet/starknetprovider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Chat Interface",
  description: "A modern AI chat interface built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StarknetProvider>{children}</StarknetProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
