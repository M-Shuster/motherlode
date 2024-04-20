import { BugAntIcon } from '@heroicons/react/24/outline';
import { tiltNeon } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${tiltNeon.className} flex flex-row items-center leading-none text-white`}
    >
      <BugAntIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="w-auto text-[40px]">MDW inc.</p>
    </div>
  );
}
