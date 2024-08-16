"use client";

import React from 'react';
import Link from 'next/link';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs';
import ThemeToggle from './ThemeToggle';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <nav className="px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MemorixAI
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <ThemeToggle />
            <SignedOut>
              <SignInButton>
                <button className="text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;