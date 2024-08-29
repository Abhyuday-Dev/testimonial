'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { Menu, MessageSquare, X } from 'lucide-react'; // Icons for hamburger menu and close button

function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  // Toggle function for opening/closing the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="p-4 bg-gray-100 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <a href="/dashboard" className="text-2xl font-bold flex items-center gap-2 text-gray-600">
        <MessageSquare className="h-6 w-6" />
          Testimonials
        </a>

        {/* Hamburger icon for mobile screens */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {menuOpen ? (
              <X className="h-6 w-6 text-purple-800" />
            ) : (
              <Menu className="h-6 w-6 text-purple-800" />
            )}
          </button>
        </div>

        {/* Sliding menu (hidden on larger screens) */}
        <div
          className={`fixed top-0 left-0 h-full w-3/4 bg-gray-800 text-white p-8 transition-transform transform ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          } md:hidden z-20`}
        >
          {/* Close button inside the sliding menu */}
          <button onClick={toggleMenu} className="mb-4">
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Menu options for signed-in users */}
          {session ? (
            <div className="flex flex-col space-y-4">
              <a href="/dashboard" className="text-xl font-bold">
                Dashboard
              </a>
              <Button
                onClick={() => signOut()}
                className="bg-slate-100 text-black w-full"
                variant="outline"
              >
                Logout
              </Button>
            </div>
          ) : (
            // Menu options for guests
            <div className="flex flex-col space-y-4">
              <Link href="/sign-in">
                <Button className="bg-gray-100 text-black w-full hover:bg-gray-200">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-purple-800 text-white w-full hover:bg-purple-600 rounded-none">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Desktop menu options (always visible on larger screens) */}
        <div className="hidden md:flex md:space-x-4 md:items-center">
          {session ? (
            <Button
              onClick={() => signOut()}
              className="bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          ) : (
            <div className="flex space-x-4">
              <Link href="/sign-in">
                <Button className="bg-gray-100 hover:bg-gray-100 text-black">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-purple-800 text-white hover:bg-purple-600">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
