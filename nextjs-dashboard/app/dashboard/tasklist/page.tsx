'use client';
// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
// import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { tajawal } from '@/app/ui/fonts';
// import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
// import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
import TasklistComp from './components/tasklistComp';

// export const metadata: Metadata = {
//   title: 'Task List',
// };

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${tajawal.className} text-2xl`}>Tasklist</h1>
      </div>
      <TasklistComp />
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
