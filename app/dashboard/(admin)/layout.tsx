import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import DashboardNav from '@/components/dashboard/DashboardNav';
import SignOutButton from '@/components/dashboard/SignOutButton';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-silver/60">Administrator</p>
            <p className="text-sm text-white">{session?.user?.email ?? 'Unknown user'}</p>
          </div>
          <SignOutButton />
        </div>
        <DashboardNav />
        {children}
      </div>
    </section>
  );
}
