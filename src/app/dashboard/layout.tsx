import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from "../providers";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

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
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 fixed h-screen">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 ml-64">
            <Providers>{children}</Providers>
          </div>
        </div>
      </body>
    </html>
  );
}
