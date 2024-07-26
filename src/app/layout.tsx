import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Get Feedback",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className} style={{ backgroundColor: "#F3F4F6" }}>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}