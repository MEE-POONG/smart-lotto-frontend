import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { Providers } from "../providers";

const chakraPetch = localFont({
  src: "../../fonts/ChakraPetch-Regular.ttf",
  variable: "--font-chakra-petch",
  weight: "100 200 300 400 500 600 700 800 900",
});

export const metadata: Metadata = {
  title: "สมาร์ทล็อตโตะ",
  description: "สมาร์ทล็อตโตะ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={`${chakraPetch.className} min-h-screen bg-gradient-to-b from-gray-50 to-gray-100`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
