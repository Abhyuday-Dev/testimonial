// Ensure your file is marked as a client component
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Adjusted import for Next.js 13+ app directory

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSignIn = () => {
    router.push("/sign-in");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center p-24 flex-grow">
        <div className="flex flex-col items-center">
          <h1 className="text-6xl text-center font-semibold pl-20 pr-20 mx-x-22 mb-6">
            Get testimonials from your customers with ease
          </h1>
          <p className="text-center text-gray-500 ml-12 mr-12 p-4 text-xl mb-6 ">
            Collecting testimonials is hard, we get it! So we built Testimonial.
            In minutes, you can collect text and video testimonials from your
            customers with no need for a developer or website hosting.
          </p>
          <div className="flex gap-3">
            <Button
              className="text-white bg-purple-800 w-[150px] h-[50px] text-lg transition-transform duration-300 hover:scale-105 hover:bg-purple-800"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              className="text-black bg-white border border-purple-800 w-[150px] h-[50px] text-lg transition-transform duration-300 hover:scale-105 hover:bg-white"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>
      <footer className="text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <p className="mb-2">&copy; 2024 Testimonial Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
