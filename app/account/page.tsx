'use client';

import Link from 'next/link';
import { CalendarDays, Crown, User, ShieldCheck, ArrowUpRight, Clock, MapPin, Sparkles, LogOut } from 'lucide-react';
import { SiteShell } from '@/components/site-shell';
import { useAuth } from '@/lib/auth/context';
import { INITIAL_BOOKINGS } from '@/lib/data-store';

export default function AccountOverviewPage() {
  const { user, logout } = useAuth();
  const activeBooking = INITIAL_BOOKINGS[0];

  return (
    <SiteShell>
      <div className="py-12 sm:py-16 bg-[#050505] min-h-[85vh]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-[0.65rem] tracking-[0.2em] uppercase font-mono">
                <ShieldCheck size={13} />
                <span>Verified Private Account</span>
              </div>
              <h1 className="mt-2 text-3xl sm:text-5xl font-serif text-white">
                Good evening, <br />
                <em className="text-[var(--gold-light)] font-normal italic font-serif">
                  {user?.fullName || 'Alexander Morgan'}.
                </em>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-[#090909] border border-[var(--gold)]/40 flex items-center gap-3">
                <Crown size={24} className="text-[var(--gold)]" />
                <div>
                  <span className="text-[0.62rem] uppercase tracking-wider text-[#888] block font-mono">
                    Tier Status
                  </span>
                  <span className="font-serif text-sm font-semibold text-[var(--gold-light)]">
                    {user?.membershipTier || 'The Privé Tier'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={logout}
                className="p-3 rounded-lg border border-white/10 text-xs text-[#888] hover:text-white hover:border-white/20 transition-colors"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>

          {/* Navigation Bar inside Account */}
          <div className="flex gap-6 pt-6 pb-8 border-b border-white/5 text-xs uppercase tracking-wider text-[#888]">
            <Link href="/account" className="text-[var(--gold-light)] font-bold border-b border-[var(--gold)] pb-1">
              Overview
            </Link>
            <Link href="/account/bookings" className="hover:text-white transition-colors">
              Reservations ({INITIAL_BOOKINGS.length})
            </Link>
            <Link href="/account/profile" className="hover:text-white transition-colors">
              Guest Dossier & Preferences
            </Link>
            <Link href="/account/membership" className="hover:text-white transition-colors">
              Membership Privileges
            </Link>
          </div>

          {/* Stat Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-[#090909] border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs text-[#888] uppercase tracking-wider">Upcoming Nights</span>
                <CalendarDays size={16} className="text-[var(--gold)]" />
              </div>
              <span className="font-serif text-3xl text-white font-normal block mt-4">1 Active</span>
              <span className="text-[0.65rem] text-[#777] mt-1 block">1 pending concierge review</span>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs text-[#888] uppercase tracking-wider">Concierge Protocol</span>
                <Sparkles size={16} className="text-[var(--gold)]" />
              </div>
              <span className="font-serif text-3xl text-[var(--gold-light)] font-normal block mt-4">Dedicated 24/7</span>
              <span className="text-[0.65rem] text-emerald-400 mt-1 block">Live line available</span>
            </div>

            <div className="p-6 rounded-xl bg-[#090909] border border-white/10">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs text-[#888] uppercase tracking-wider">Account Security</span>
                <ShieldCheck size={16} className="text-[var(--gold)]" />
              </div>
              <span className="font-serif text-3xl text-white font-normal block mt-4">NDA Active</span>
              <span className="text-[0.65rem] text-[#777] mt-1 block">Encrypted communication channel</span>
            </div>
          </div>

          {/* Upcoming Reservation Card */}
          <div className="mt-10 p-8 rounded-2xl bg-[#090909] border border-[var(--border)] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[0.62rem] tracking-wider uppercase text-[var(--gold-light)] font-mono">
                  Upcoming Itinerary
                </span>
                <h3 className="text-2xl font-serif text-white mt-1">{activeBooking.venueName}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono uppercase">
                {activeBooking.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-[#bbb]">
              <div>
                <span className="text-[#777] block uppercase text-[0.62rem]">Reference</span>
                <span className="font-mono text-white font-bold">{activeBooking.referenceCode}</span>
              </div>
              <div>
                <span className="text-[#777] block uppercase text-[0.62rem]">Schedule</span>
                <span className="font-mono text-white">{activeBooking.bookingDate} · {activeBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[#777] block uppercase text-[0.62rem]">Party</span>
                <span className="text-white">{activeBooking.guestCount} Guests</span>
              </div>
              <div>
                <span className="text-[#777] block uppercase text-[0.62rem]">Estimated Amount</span>
                <span className="font-mono text-[var(--gold-light)] font-bold">${activeBooking.totalPriceUsd} USD</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <Link
                href="/account/bookings"
                className="text-xs text-[var(--gold-light)] hover:underline flex items-center gap-1 uppercase tracking-wider"
              >
                <span>View Full Reservation Details</span>
                <ArrowUpRight size={13} />
              </Link>
              <Link
                href="/booking"
                className="px-4 py-2 text-xs tracking-wider uppercase font-semibold text-[#090704] bg-[var(--gold)]"
              >
                Book Another Evening
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
