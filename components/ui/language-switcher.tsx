'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '@/lib/i18n/context';
import type { Locale } from '@/lib/i18n';

export function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = supportedLocales.find((l) => l.code === locale) || supportedLocales[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/10 hover:border-[var(--gold)]/40 bg-white/[0.03] text-[0.68rem] tracking-wider text-[#c5c0b8] hover:text-white transition-all"
        aria-label="Select Language"
      >
        <Globe size={13} className="text-[var(--gold)]" />
        <span className="font-mono uppercase">{current.code.toUpperCase()}</span>
        <ChevronDown size={11} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg bg-[#0c0c0c] border border-[var(--border)] shadow-2xl py-1.5 z-50 backdrop-blur-xl">
          <div className="px-3 py-1.5 text-[0.58rem] tracking-[0.16em] uppercase text-[#736e67] border-b border-white/5 font-mono">
            Select Language
          </div>
          {supportedLocales.map((loc) => {
            const isSelected = loc.code === locale;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={() => {
                  setLocale(loc.code as Locale);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[var(--gold)]/10 text-[var(--gold-light)] font-semibold'
                    : 'text-[#aaa59c] hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{loc.flag}</span>
                  <span>{loc.nativeName}</span>
                </div>
                {isSelected && <Check size={13} className="text-[var(--gold)]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
