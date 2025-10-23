'use client';

import { FormEvent, useMemo, useState } from 'react';
import { cars } from '@/lib/cars';
import GlowButton from '@/components/ui/GlowButton';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function TestDrivePage() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get('vehicle');
  const [formState, setFormState] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicle: preselected ?? '',
    preferredDate: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const calendarLink = useMemo(() => {
    const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const text = encodeURIComponent(`Test Drive - ${formState.vehicle || 'Iliadis Executive Cars'}`);
    const details = encodeURIComponent(
      `Client: ${formState.fullName}\nPhone: ${formState.phone}\nEmail: ${formState.email}\nVehicle: ${formState.vehicle}\nPreferred Date: ${formState.preferredDate}`
    );
    return `${base}&text=${text}&details=${details}`;
  }, [formState]);

  const whatsappLink = useMemo(() => {
    const message = encodeURIComponent(
      `Hello Iliadis Executive Cars,%0A%0AI would like to book a test drive.%0A%0AName: ${formState.fullName}%0APhone: ${formState.phone}%0AVehicle: ${formState.vehicle}%0APreferred Date: ${formState.preferredDate}`
    );
    return `https://wa.me/302101234567?text=${message}`;
  }, [formState]);

  const emailLink = useMemo(() => {
    const subject = encodeURIComponent('Test Drive Request - Iliadis Executive Cars');
    const body = encodeURIComponent(
      `Name: ${formState.fullName}\nPhone: ${formState.phone}\nVehicle: ${formState.vehicle}\nPreferred Date: ${formState.preferredDate}`
    );
    return `mailto:liaison@iliadis.gr?subject=${subject}&body=${body}`;
  }, [formState]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="glass rounded-3xl border border-white/10 bg-black/30 p-10 shadow-innerGlow">
          <p className="text-xs uppercase tracking-[0.55em] text-silver/60">Book A Private Experience</p>
          <h1 className="mt-4 font-heading text-4xl text-white">Test Drive Concierge</h1>
          <p className="mt-3 text-sm text-silver/70">
            Submit your details and our executive liaison team will coordinate a bespoke test drive or showroom preview.
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-6">
            {[
              { label: 'Full Name', field: 'fullName', type: 'text', placeholder: 'John Papadopoulos' },
              { label: 'Phone', field: 'phone', type: 'tel', placeholder: '+30 69 1234 5678' },
              { label: 'Email', field: 'email', type: 'email', placeholder: 'vip@domain.com' }
            ].map((input) => (
              <div key={input.field}>
                <label className="text-xs uppercase tracking-[0.4em] text-silver/60">{input.label}</label>
                <input
                  required
                  type={input.type}
                  value={formState[input.field as keyof typeof formState] as string}
                  onChange={(event) => setFormState((prev) => ({ ...prev, [input.field]: event.target.value }))}
                  placeholder={input.placeholder}
                  className="mt-3 w-full rounded-full border border-white/20 bg-black/40 px-5 py-3 text-sm text-white placeholder:text-silver/40 focus:border-white/60 focus:outline-none"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-[0.4em] text-silver/60">Vehicle</label>
              <select
                required
                value={formState.vehicle}
                onChange={(event) => setFormState((prev) => ({ ...prev, vehicle: event.target.value }))}
                className="mt-3 w-full rounded-full border border-white/20 bg-black/40 px-5 py-3 text-sm text-white focus:border-white/60 focus:outline-none"
              >
                <option value="" disabled>
                  Select a vehicle
                </option>
                {cars.map((car) => (
                  <option key={car.id} value={car.name}>
                    {car.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.4em] text-silver/60">Preferred Date</label>
              <input
                required
                type="date"
                value={formState.preferredDate}
                onChange={(event) => setFormState((prev) => ({ ...prev, preferredDate: event.target.value }))}
                className="mt-3 w-full rounded-full border border-white/20 bg-black/40 px-5 py-3 text-sm text-white focus:border-white/60 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <GlowButton type="submit">Submit Request</GlowButton>
              <GlowButton href={whatsappLink} variant="secondary">
                Send via WhatsApp
              </GlowButton>
            </div>
          </form>
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                className="mt-8 rounded-3xl border border-emerald-400/40 bg-emerald-500/10 p-6 text-sm text-emerald-200"
              >
                <p className="font-heading text-lg text-white">Your test drive request has been sent.</p>
                <p className="mt-2 text-silver/70">
                  Our team will contact you shortly to schedule the appointment. Add it to your calendar or follow up by email.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <GlowButton href={calendarLink} variant="secondary">
                    Add to Calendar
                  </GlowButton>
                  <GlowButton href={emailLink} variant="secondary">
                    Send Email Confirmation
                  </GlowButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="space-y-6">
          <div className="glass rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-transparent to-transparent p-10 shadow-innerGlow">
            <h2 className="font-heading text-2xl text-white">Concierge Privileges</h2>
            <ul className="mt-4 space-y-4 text-sm text-silver/70">
              <li>• Private lounge reception in Athens with signature welcome ritual.</li>
              <li>• Racetrack or coastal route options tailored to each vehicle.</li>
              <li>• Chauffeur-driven collection and return on request.</li>
              <li>• Opportunity to explore financing or trade-in packages.</li>
            </ul>
          </div>
          <div className="glass rounded-3xl border border-white/10 bg-black/40 p-10 shadow-innerGlow">
            <h2 className="font-heading text-2xl text-white">Need Immediate Assistance?</h2>
            <p className="mt-3 text-sm text-silver/70">
              Call our executive line at <a href="tel:+302101234567" className="text-white">+30 210 123 4567</a> or visit the showroom at
              Leof. Kifisias 54, Athens.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
