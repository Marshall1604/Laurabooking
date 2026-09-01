'use client';

import React, { useState } from 'react';
import { SiteShell } from '@/components/site-shell';
import { ShieldCheck, Sparkles, Building2, Handshake, CheckCircle2, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '@/data/landing';

export default function PartnerWithUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    serviceCategory: 'Massage & Spa',
    destination: 'Ho Chi Minh City',
    address: '',
    description: '',
    partnershipType: 'Exclusive Venue Host',
    consent: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <SiteShell>
      <div className="py-16 sm:py-24 bg-[#050505] relative overflow-hidden">
        {/* Background ambient lighting */}
        <div
          className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(218,189,126,0.08)_0%,transparent_70%)] blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Vision & Benefits */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-medium">
                  <span className="w-6 h-px bg-[var(--gold)]" />
                  <span>Hospitality Network</span>
                </div>
                <h1 className="mt-4 text-4xl sm:text-6xl font-serif text-[var(--foreground)] leading-[1.05]">
                  Exceptional places <br />
                  <em className="text-[var(--gold-light)] font-normal italic font-serif">deserve discovery.</em>
                </h1>
                <p className="mt-4 text-sm sm:text-base text-[#a8a39a] font-light leading-relaxed">
                  Join a selective network of hospitality partners trusted by discerning international guests, family offices, and VIP patrons.
                </p>
              </div>

              <div className="space-y-6 pt-4 border-t border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white">Qualified High-Intent Patrons</h3>
                    <p className="text-xs text-[#8f8a82] font-light mt-1 leading-relaxed">
                      We curate and verify all incoming guest profiles, ensuring respectful and high-value clientele for your venue.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white">Editorial Storytelling</h3>
                    <p className="text-xs text-[#8f8a82] font-light mt-1 leading-relaxed">
                      Your venue is showcased through cinematic photography, sommelier tasting notes, and bespoke marketing dossiers.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0">
                    <Handshake size={18} />
                  </div>
                  <div>
                    <h3 className="text-base font-serif text-white">Dedicated Partner Support</h3>
                    <p className="text-xs text-[#8f8a82] font-light mt-1 leading-relaxed">
                      Direct integration with your reservations team, 24/7 host coordination, and seamless billing terms.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <div className="p-8 sm:p-12 rounded-2xl bg-[#090909] border border-[var(--gold)] text-center space-y-4">
                  <div className="w-14 h-14 rounded-full border border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center mx-auto">
                    <CheckCircle2 size={28} />
                  </div>
                  <h2 className="text-3xl font-serif text-white">Application Received</h2>
                  <p className="text-sm text-[#b0aba2] max-w-md mx-auto font-light leading-relaxed">
                    Thank you for introducing your venue. Our curation committee reviews all submissions privately within 3–5 business days.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 text-xs tracking-wider uppercase font-semibold text-white border border-white/10 hover:border-[var(--gold)] rounded"
                  >
                    Submit Another Venue
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="p-6 sm:p-10 rounded-2xl bg-[#090909] border border-[var(--border)] space-y-5 shadow-2xl"
                >
                  <div>
                    <h2 className="text-2xl font-serif text-white">Introduce Your Experience</h2>
                    <p className="text-xs text-[#8e8981] font-light mt-1">
                      Complete the application below to initiate our private review process.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        Business / Venue Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Le Sanctuaire Penthouse"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        Contact Person Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Valerie Chau"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        Corporate / Contact Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="partner@luxuryvenue.vn"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+84 903 000 111"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        Service Category *
                      </label>
                      <select
                        value={formData.serviceCategory}
                        onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      >
                        <option>Massage & Spa</option>
                        <option>Wine Tasting Cellar</option>
                        <option>Night Club</option>
                        <option>Superyacht Charter</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                        City / Destination *
                      </label>
                      <select
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      >
                        {DESTINATIONS.map((d) => (
                          <option key={d.name} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.68rem] tracking-wider uppercase text-[#aaa] mb-1.5">
                      Tell us what makes your venue exceptional *
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={800}
                      placeholder="Private rooms, unique vintages, acoustic atmosphere, hygiene certifications, accolades..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-[#111] border border-white/15 rounded p-3 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 text-xs text-[#8e8981]">
                    <input
                      type="checkbox"
                      id="partner-consent"
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-0.5 accent-[var(--gold)]"
                    />
                    <label htmlFor="partner-consent" className="text-[0.72rem] leading-relaxed cursor-pointer">
                      I agree to AURELIS partner privacy standards and authorize private verification contact.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 text-xs tracking-[0.16em] uppercase font-bold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] hover:opacity-90 transition-opacity"
                  >
                    {loading ? 'Submitting Dossier...' : 'Submit Application For Review'}
                  </button>

                  <small className="block text-center text-[0.65rem] text-[#6b665f]">
                    All submissions are reviewed privately within 3–5 business days under strict NDA.
                  </small>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  );
}
