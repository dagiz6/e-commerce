import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ethiopian Shoping Center",
  description: "the best place to buy Ethiopian products online and have them delivered to your location, anything you want, we have it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
