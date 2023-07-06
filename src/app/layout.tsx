import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Export subscriptions from Invidious to NewPipe",
  description: "Convert Invidious subscriptions file to NewPipe format",
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <html lang="en">
    <body className={inter.className}>
      {children}
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
