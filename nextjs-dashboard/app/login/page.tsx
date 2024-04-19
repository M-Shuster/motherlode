import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <Image
        src="/login-background-desktop.jpeg"
        layout="fill"
        objectFit="cover"
        className="hidden opacity-75 md:block"
        alt="Login page desktop background image"
      />
      <Image
        src="/login-background-mobile.jpeg"
        layout="fill"
        objectFit="cover"
        className=" block opacity-75 md:hidden"
        alt="Login page mobile background image"
      />
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-40% to-emerald-500 to-90% p-3  md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
