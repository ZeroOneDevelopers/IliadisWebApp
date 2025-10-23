'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GlowButton from '@/components/ui/GlowButton';

const leads = [
  { id: 1, name: 'Alexandros K.', car: 'Ferrari SF90 Stradale', date: '2024-06-20', status: 'Pending' },
  { id: 2, name: 'Maria P.', car: 'Rolls-Royce Ghost Black Badge', date: '2024-06-18', status: 'Scheduled' },
  { id: 3, name: 'Eleni T.', car: 'Lamborghini Urus Performante', date: '2024-06-22', status: 'Pending' },
  { id: 4, name: 'Nikos D.', car: 'Mercedes-Maybach S 680 4MATIC', date: '2024-06-21', status: 'Completed' },
  { id: 5, name: 'Spiros L.', car: 'Ferrari Roma', date: '2024-06-15', status: 'Completed' },
  { id: 6, name: 'Georgia M.', car: 'McLaren 765LT Spider', date: '2024-06-25', status: 'Scheduled' }
] as const;

type Status = 'All' | 'Pending' | 'Scheduled' | 'Completed';

const statusCards: { label: string; value: number; status: Status; highlight: string }[] = [
  { label: 'Total Leads', value: leads.length, status: 'All', highlight: 'bg-white/10' },
  { label: 'Pending', value: leads.filter((lead) => lead.status === 'Pending').length, status: 'Pending', highlight: 'bg-amber-500/10' },
  { label: 'Scheduled', value: leads.filter((lead) => lead.status === 'Scheduled').length, status: 'Scheduled', highlight: 'bg-sky-500/10' },
  { label: 'Completed', value: leads.filter((lead) => lead.status === 'Completed').length, status: 'Completed', highlight: 'bg-emerald-500/10' }
];

export default function DashboardPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<Status>('All');

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = status === 'All' ? true : lead.status === status;
      const matchesSearch = search
        ? lead.name.toLowerCase().includes(search.toLowerCase()) || lead.car.toLowerCase().includes(search.toLowerCase())
        : true;
      return matchesStatus && matchesSearch;
    });
  }, [search, status]);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-6xl space-y-12">
        <header className="space-y-4">
          <p className="text-xs uppercase tracking-[0.55em] text-silver/60">Admin Control Centre</p>
          <h1 className="font-heading text-4xl text-white">Lead Intelligence Dashboard</h1>
          <p className="text-sm text-silver/70">
            Monitor incoming enquiries, coordinate test drives, and keep the team aligned with a cinematic cockpit view.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-4">
          {statusCards.map((card) => (
            <motion.button
              key={card.label}
              onClick={() => setStatus(card.status)}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border border-white/10 p-6 text-left transition-all duration-500 ${card.highlight} ${
                status === card.status ? 'shadow-glow border-white/40' : 'shadow-innerGlow'
              }`}
            >
              <p className="text-xs uppercase tracking-[0.45em] text-silver/60">{card.label}</p>
              <p className="mt-4 font-heading text-3xl text-white">{card.value}</p>
            </motion.button>
          ))}
        </div>
        <div className="glass rounded-3xl border border-white/10 bg-black/40 p-8 shadow-innerGlow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by client or vehicle"
              className="w-full rounded-full border border-white/20 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-silver/40 focus:border-white/60 focus:outline-none sm:max-w-xs"
            />
            <GlowButton variant="secondary">Export Leads</GlowButton>
          </div>
          <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-white/5 uppercase tracking-[0.35em] text-silver/60">
                <tr>
                  <th className="px-6 py-4">Client</th>
                  <th className="px-6 py-4">Vehicle</th>
                  <th className="px-6 py-4">Preferred Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="bg-black/40">
                    <td className="px-6 py-4 text-white">{lead.name}</td>
                    <td className="px-6 py-4 text-silver/80">{lead.car}</td>
                    <td className="px-6 py-4 text-silver/60">{lead.date}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-4 py-1 text-xs uppercase tracking-[0.3em] ${
                          lead.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-200'
                            : lead.status === 'Scheduled'
                              ? 'bg-sky-500/10 text-sky-200'
                              : 'bg-amber-500/10 text-amber-200'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <p className="p-8 text-center text-sm text-silver/60">No leads found with the current filters.</p>
            )}
          </div>
        </div>
        <div className="glass rounded-3xl border border-white/10 bg-black/40 p-10 shadow-innerGlow">
          <h2 className="font-heading text-2xl text-white">Audio Library</h2>
          <p className="mt-2 text-sm text-silver/70">
            Upload bespoke engine start or rev sequences to enhance each vehicle profile in the digital showroom.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <GlowButton variant="secondary">Upload Soundtrack</GlowButton>
            <GlowButton variant="secondary">Manage Library</GlowButton>
          </div>
        </div>
      </div>
    </section>
  );
}
