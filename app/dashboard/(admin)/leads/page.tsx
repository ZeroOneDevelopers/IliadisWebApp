import { prisma } from '@/lib/prisma';
import { formatCurrency } from '@/lib/vehicles';

export const revalidate = 0;

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({
    include: {
      vehicle: { select: { title: true, price: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-3xl text-white">Lead Registry</h1>
        <p className="text-sm text-silver/70">Review inbound enquiries with direct contact details for rapid follow-up.</p>
      </div>
      <div className="glass overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-innerGlow">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-white/5 uppercase tracking-[0.35em] text-silver/60">
            <tr>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Contact</th>
              <th className="px-6 py-4">Vehicle</th>
              <th className="px-6 py-4">Submitted</th>
              <th className="px-6 py-4">Type</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {leads.map((lead) => (
              <tr key={lead.id} className="bg-black/40">
                <td className="px-6 py-4 text-white">
                  <p className="font-heading text-lg">{lead.name}</p>
                  {lead.message && <p className="text-xs text-silver/60">{lead.message}</p>}
                </td>
                <td className="px-6 py-4 text-silver/70">
                  <p>{lead.phone}</p>
                  <p>{lead.email}</p>
                </td>
                <td className="px-6 py-4 text-silver/70">
                  <p>{lead.vehicle?.title ?? 'Unassigned'}</p>
                  {lead.vehicle?.price ? <p className="text-xs text-silver/50">{formatCurrency(lead.vehicle.price)}</p> : null}
                </td>
                <td className="px-6 py-4 text-silver/60">{lead.createdAt.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-silver/70">
                    {lead.type.replace('_', ' ')}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && <p className="p-8 text-center text-sm text-silver/60">No leads captured yet.</p>}
      </div>
    </div>
  );
}
