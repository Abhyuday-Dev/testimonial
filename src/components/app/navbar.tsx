'use client'

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../ui/button';


function Navbar() {
  const { data: session } = useSession();

  
  const user = session?.user;
  return (
    <nav className="p-4 md:p-4   bg-gray-100 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-2xl font-bold text-purple-800 mb-4 md:mb-0">
          Testimonials
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.name || 'User'} {/* You can customize the greeting with the user's name */}
            </span>
            <Button onClick={() => signOut()} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <div className="flex space-x-4">
            <Link href="/sign-in">
              <Button className="w-full md:w-auto bg-gray-100 hover:bg-gray-100 text-black" >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="w-full md:w-auto bg-purple-800 text-white hover:bg-purple-600 rounded-none" >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;