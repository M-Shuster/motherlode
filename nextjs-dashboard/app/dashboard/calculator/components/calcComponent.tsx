import { tiltNeon } from '@/app/ui/fonts';
import { Metadata } from 'next';
import CalcInput from './calcInput';
import CalcSkillPicker from './calcSkillPicker';
import DropdownComponent from './dropdownComp';

export const metadata: Metadata = {
  title: 'Calculator',
};

export default async function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${tiltNeon.className} text-2xl`}>Calculator</h1>
      </div>
      <div>
        <CalcSkillPicker />
        <DropdownComponent />
        <CalcInput />
      </div>
      {/* <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
