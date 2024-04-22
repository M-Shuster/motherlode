'use client';

import { tiltNeon } from '@/app/ui/fonts';
import { AtSymbolIcon } from '@heroicons/react/24/outline';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from 'next/link';
import { useState } from 'react';

export default function ResetPasswordForm() {
  const [inputValue, setInputValue] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('Input value on submit: ', inputValue); // we need to save this somewhere in state to be used in a magic link generator
    window.location.href = '/login/reset/submit';
  }
  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${tiltNeon.className} mb-3 text-2xl`}>
          Forgot Password?
        </h1>
        <p className={`${tiltNeon.className} mb-3 text-sm`}>
          Enter your email below. If your email address is registered in our
          system you will recieve a magic link to access the platform.
        </p>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                onChange={(event) => setInputValue(event.target.value)}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SubmitButton />
        <BackButton />
      </div>
    </form>
  );
}

function SubmitButton() {
  return (
    <Button type="submit" className="m-auto mt-4 w-1/2">
      Submit
      <ArrowUturnLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}

function BackButton() {
  return (
    <Link href="/login">
      <Button className="m-auto mt-4 w-1/2">
        Back to login
        <ArrowUturnLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Link>
  );
}
