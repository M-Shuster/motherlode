'use client';

import { tiltNeon } from '@/app/ui/fonts';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import Link from 'next/link';

export default function ResetPasswordForm() {
  return (
    <form className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${tiltNeon.className} mb-3 text-2xl`}>
          Password request submitted
        </h1>
        <p className={`${tiltNeon.className} mb-3 text-sm`}>
          Thank you for submitting a password reset. If your email address is
          registered in our system you will shortly recieve a magic link to
          access the platform.
        </p>
        <BackButton />
      </div>
    </form>
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
