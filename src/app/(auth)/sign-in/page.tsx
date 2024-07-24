"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "next-auth/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { signInSchema } from "@/schemas/signinSchema";



export default function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // const onSubmit = async (data: z.infer<typeof signInSchema>) => {
  //   const result = await signIn('credentials', {
  //     redirect: false,
  //     email: data.email,
  //     password: data.password,
  //   });
  //   console.log(result);

  //   if (result?.error) {
  //     if (result.error === 'CredentialsSignin') {
  //       toast({
  //         title: 'Login Failed',
  //         description: 'Incorrect username or password',
  //         variant: 'destructive',
  //       });
  //     } else {
  //       toast({
  //         title: 'Error',
  //         description: result.error,
  //         variant: 'destructive',
  //       });
  //     }
  //   } else if (result?.url) {
  //     router.replace('/'); 
  //   }
  // };
  const onSubmit = async (data: z.infer<typeof signInSchema> ) => {
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      // Display an error toast if sign in fails
      toast({
        title: "Sign In Error",
        description: result.error,
        variant: "destructive",
      });
    } else {
      // Redirect or handle successful sign-in
      toast({
        title: "Signed In",
        description: "You have successfully signed in.",
      });
      router.push("/"); // Redirect to homepage or desired route
    }
  };

  const GoogleIcon = () => (
    <img
      className="text-subtle mr-2 h-4 w-4 dark:invert"
      src="/google-icon.svg"
      alt=""
    />
  );

  const handleGoogleSignIn = async () => {
    console.log("google");
    setIsSubmitting(true);
    try {
      await signIn("google", { callbackUrl: "/" });
      router.replace(`/`);
    } catch (error) {
      console.error("Google Sign-In Error", error);
      toast({
        title: "Sign-In Failed",
        description: "Failed to sign in with Google.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-3xl mb-3">
            Welcome Back
          </h1>
          <p className="mb-4">Sign in to continue to Testimonials</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Button
              type="button"
              className="w-full text-blue-700 bg-gray-100 hover:bg-gray-200"
              onClick={handleGoogleSignIn}
              disabled={isSubmitting}
            >
              <GoogleIcon />
              Sign in with Google
            </Button>
            <div className="flex items-center text-sm text-gray-400">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="mx-4 uppercase">or continue with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input placeholder="you@example.com" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" placeholder="Password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full bg-purple-800 hover:bg-purple-700"
              type="submit"
            >
              Sign In
            </Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link
              href="/sign-up"
              className="text-purple-600 hover:text-blue-800"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}