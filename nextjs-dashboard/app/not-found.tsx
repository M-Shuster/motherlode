import Link from 'next/link';
import { pixelifySans } from '@/app/ui/fonts';
import Image from 'next/image';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

export default function NotFoundRoot() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center  bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center space-y-4 p-10">
        <Image
          src="/darthVaderPixelated.jpeg"
          width={320}
          height={320}
          alt="Root 404 error image"
        />
        <h3
          className={`${pixelifySans.className} text-center text-4xl font-bold text-gray-900 dark:text-gray-100`}
        >
          I find your lack of page disturbing.
        </h3>
        <p className="text-md text-center text-gray-700 dark:text-gray-300">
          You are here because:
        </p>
        <p className="text-md text-center text-gray-700 dark:text-gray-300">
          - You have visited an out of date bookmark or link
        </p>
        <p className="text-md text-center text-gray-700 dark:text-gray-300">
          -The address has been mistyped
        </p>
        <p className="text-md text-center text-gray-700 dark:text-gray-300">
          - Michael has forgotten to code something properly
        </p>
        <p className="text-md text-center text-gray-700 dark:text-gray-300">
          - Rebel scum
        </p>
        <Link
          href="/login"
          className={`${pixelifySans.className} inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-4 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300`}
        >
          Outrun Imperial starships
          <div className="pl-4 ">
            <ArrowUturnLeftIcon className="pointer-events-none  left-3 top-1/2 h-4 w-4  text-gray-900 peer-focus:text-gray-900" />
          </div>
        </Link>
      </div>
    </div>
  );
}
