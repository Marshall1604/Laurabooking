'use client';

import Link from 'next/link';
import { CalendarDays, Clock, Users, MapPin, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { INITIAL_BOOKINGS } from '@/lib/data-store';

export default function AccountBookingsPage() {
  return (
    <SiteShell>
      <div className="py-12 sm:py-16 bg-[#050505] min-h-[85vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#888] hover:text-[var(--gold-light)] mb-6 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Account Overview</span>
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[var(--gold-light)] font-mono">
                Reservation Ledger
              </span>
              <h1 className="mt-1 text-3xl sm:text-4xl font-serif text-white">Your Reservations</h1>
            </div>

            <Link
              href="/booking"
              className="px-5 py-2.5 text-xs tracking-wider uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b]"
            >
              New Reservation
            </Link>
          </div>

          {/* Bookings List */}
          <div className="mt-8 space-y-6">
            {INITIAL_BOOKINGS.map((booking) => {
              const isConfirmed = booking.status === 'confirmed';
              return (
                <div
                  key={booking.id}
                  className="p-6 sm:p-8 rounded-2xl bg-[#090909] border border-[var(--border)] space-y-6 hover:border-[var(--gold)]/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs font-mono text-[var(--gold-light)] font-bold">
                        {booking.referenceCode}
                      </span>
                      <h3 className="text-2xl font-serif text-white mt-1">{booking.venueName}</h3>
                      <p className="text-xs text-[#888] mt-0.5">{booking.packageName}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-mono uppercase ${
                          isConfirmed
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                            : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-[#aaa]">
                    <div>
                      <span className="text-[#666] block uppercase text-[0.62rem]">Schedule</span>
                      <span className="font-mono text-white">{booking.bookingDate} · {booking.timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-[#666] block uppercase text-[0.62rem]">Party</span>
                      <span className="text-white">{booking.guestCount} Guests</span>
                    </div>
                    <div>
                      <span className="text-[#666] block uppercase text-[0.62rem]">Total Investment</span>
                      <span className="font-mono text-[var(--gold-light)] font-bold">${booking.totalPriceUsd} USD</span>
                    </div>
                    <div>
                      <span className="text-[#666] block uppercase text-[0.62rem]">Guest Contact</span>
                      <span className="text-white truncate block">{booking.guestEmail}</span>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-xs text-[#999]">
                      <span className="text-[#666] block uppercase text-[0.6rem] mb-1 font-mono">
                        Special Concierge Requests
                      </span>
                      <p>{booking.specialRequests}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <span className="text-[#777]">
                      Created on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => alert('Your request to modify this reservation has been dispatched to your dedicated host.')}
                        className="text-[#999] hover:text-white transition-colors"
                      >
                        Request Modification
                      </button>
                      <button
                        type="button"
                        onClick={() => alert('Cancellation request received under grace policy.')}
                        className="text-rose-400 hover:text-rose-300 transition-colors"
                      >
                        Cancel Reservation
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
