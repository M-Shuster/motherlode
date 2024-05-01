'use client';
// import Pagination from '@/app/ui/invoices/pagination';
// import Search from '@/app/ui/search';
// import Table from '@/app/ui/invoices/table';
import { tajawal } from '@/app/ui/fonts';
// import { Suspense } from 'react';
import TasklistComp from './components/tasklistComp';

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
    <div className="flex h-full w-full flex-col items-center">
      <TasklistComp />
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}
