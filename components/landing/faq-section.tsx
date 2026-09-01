'use client';

import { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQS } from '@/data/landing';
import { FadeUp } from '@/components/motion/fade-up';
import { useI18n } from '@/lib/i18n/context';

export function FAQSection() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#070707] relative overflow-hidden font-sans">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <FadeUp>
            <div className="inline-flex items-center gap-2.5 text-[var(--gold-light)] text-[0.68rem] tracking-[0.24em] uppercase font-semibold">
              <ShieldCheck size={14} className="text-[var(--gold)]" />
              <span>{t('faq_eyebrow')}</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-serif text-[var(--foreground)] leading-[1.05] font-normal">
              {t('faq_title')}
            </h2>
          </FadeUp>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-[var(--border)] bg-[#0c0c0c] overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 group"
                >
                  <span className="font-serif text-lg sm:text-xl text-white group-hover:text-[var(--gold-light)] transition-colors font-normal">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[var(--gold)] transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[var(--gold)] text-black' : ''
                    }`}
                  >
                    <ChevronDown size={14} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-2 text-sm text-[#a8a39a] leading-relaxed border-t border-white/5 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
