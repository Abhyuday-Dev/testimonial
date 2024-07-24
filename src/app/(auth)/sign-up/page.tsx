'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';
import axios, { AxiosError } from "axios";
import { ApiResponse } from '@/types/ApiResponse';
import { signUpSchema } from '@/schemas/signupSchema';


export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

 //zod
 const form = useForm<z.infer<typeof signUpSchema>>({
  resolver: zodResolver(signUpSchema),
  defaultValues: {
    username: "",
    email: "",
    password: "",
  },
});

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      console.log(response)
      toast({
        title: "Success",
        description: response.data.message,
      });

    //   change this to dashboard
      router.replace('/sign-in');
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in Signup of User", error);
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMsg = axiosError.response?.data.message;
      toast({
        title: "SignUp Failed",
        description: errorMsg,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const GoogleIcon = () => (
    <img className="text-subtle mr-2 h-6 w-6 dark:invert" src="/google-icon.svg" alt="" />
  );

  const handleGoogleSignIn = async () => {
    console.log("google")
    setIsSubmitting(true);
    try {
      await signIn("google", { callbackUrl: '/' })
      
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
          <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl mb-6">
            Create Account
          </h1>
          <p className="mb-4">Enter your email below to create your account</p>
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
            Sign up with Google
          </Button>
          <div className="flex items-center text-sm text-gray-400">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="mx-4 uppercase">or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
          <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className='w-full bg-purple-800  hover:bg-purple-700' type="submit">Sign Up</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Already a Member?{' '}
            <Link href="/sign-in" className="text-purple-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}