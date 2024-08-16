"use client";

import React from 'react';
import Link from 'next/link';
import { SignInButton, SignedOut, SignedIn, UserButton } from '@clerk/nextjs';

const NavBar: React.FC = () => {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MemorixAI
            </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <SignedOut>
              <SignInButton>
                <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Log in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <a
              href="#"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Get started
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
