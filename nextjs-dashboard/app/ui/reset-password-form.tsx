'use client';

import { tiltNeon } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useFormState } from 'react-dom';
import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="space-y-3">
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
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SubmitButton />
        <BackButton />
        {/* <div className="flex h-8 items-end space-x-1">
          Add form errors here
        </div> */}
      </div>
    </form>
  );
}

// TODO: this needs to make sure a value is entered into the email and check its of valid type, then needs to do something with that value upon click
function SubmitButton() {
  return (
    <Link href="/login/reset/submit">
      <Button className="m-auto mt-4 w-1/2">
        Submit
        <ArrowUturnLeftIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    </Link>
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
