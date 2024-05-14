import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  LightBulbIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline';
import { fetchCardData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  users: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  notes: LightBulbIcon,
  tasks: ListBulletIcon,
};

export default async function NewCardWrapper() {
  const {
    totalPaidInvoices,
    totalPendingInvoices,
    numberOfUsers,
    numberOfInvoices,
    numberOfTasksOutstanding,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Users" value={numberOfUsers} type="users" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Notes" value={numberOfInvoices} type="notes" />
      <Card
        title="Outstanding Tasks"
        value={numberOfTasksOutstanding}
        type="tasks"
      />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'users' | 'pending' | 'collected' | 'tasks' | 'notes';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
