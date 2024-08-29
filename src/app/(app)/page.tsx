
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const router = useRouter();



  return (
    <div className="flex flex-col min-h-screen">
    {/* <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">TestimonialGather</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Pricing
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          About
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
          Contact
        </Link>
      </nav>
    </header> */}
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Gather Powerful Testimonials
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Boost your credibility and convert more customers with authentic testimonials. Easy to collect, manage, and showcase.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/sign-up">
              <Button className="bg-purple-800" >Get Started</Button>
              </Link>
              <Button variant="outline" className="border-purple-800">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            Why Choose Testimonials?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-3 text-center">
              <Star className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Easy Collection</h3>
              <p className="text-gray-500 dark:text-gray-400">Simple forms and automated follow-ups make gathering testimonials a breeze.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Social Proof</h3>
              <p className="text-gray-500 dark:text-gray-400">Showcase real customer experiences to build trust and credibility.</p>
            </div>
            <div className="flex flex-col items-center space-y-3 text-center">
              <TrendingUp className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-bold">Boost Conversions</h3>
              <p className="text-gray-500 dark:text-gray-400">Turn positive feedback into powerful marketing tools to increase sales.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 flex flex-col justify-center items-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Start Gathering Testimonials Today</h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 justify-center">
              Join thousands of businesses leveraging the power of customer testimonials. Sign up now and get your first month free!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                <Link href="/sign-up">
              <Button className="bg-purple-800" >Signup</Button>
              </Link>
                
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing up, you agree to our{" "}
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Testimonials. All rights reserved.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
    </footer>
  </div>
  );
}
