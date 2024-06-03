// import CardWrapper from '@/app/ui/dashboard/cards';
import NewCardWrapper from '@/app/ui/dashboard/newCards';
import { tiltNeon } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { auth } from '@/auth';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Page() {
  // whilst the property doesn't exist on the type of session, it looks like it overwrites it on a case by case basis
  const { user } = await auth();
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfInvoices,
    numberOfCustomers,
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${tiltNeon.className} mb-4 text-xl md:text-2xl`}>
        Welcome to the Dashboard {user?.name}!
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <NewCardWrapper />
        </Suspense>
      </div>
    </main>
  );
}
