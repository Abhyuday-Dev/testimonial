
'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 

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
      {/* Main content */}
      <main className="flex flex-col items-center justify-center p-8 md:p-24 flex-grow">
        <div className="flex flex-col items-center">
          {/* Title with responsive font sizes */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-semibold mb-6 px-4 sm:px-10 lg:px-20">
            Get testimonials from your customers with ease
          </h1>
          
          {/* Description text with responsive size and margin */}
          <p className="text-center text-gray-500 px-4 sm:px-8 lg:px-12 py-4 text-sm sm:text-xl mb-6">
            Collecting testimonials is hard, we get it! So we built Testimonial. 
            In minutes, you can collect text and video testimonials from your customers 
            with no need for a developer or website hosting.
          </p>

          {/* Buttons with responsive width and hover effects */}
          <div className="flex gap-3 sm:flex-row">
            <Button
              className="text-white bg-purple-800 w-full sm:w-[150px] h-[50px] text-lg transition-transform duration-300 hover:scale-105 hover:bg-purple-800"
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
            <Button
              className="text-black bg-white border border-purple-800 w-full sm:w-[150px] h-[50px] text-lg transition-transform duration-300 hover:scale-105 hover:bg-white"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-black py-6 bg-gray-100 w-full">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2024 Testimonial Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
