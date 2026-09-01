'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  SlidersHorizontal,
  Layers,
  Users,
  Handshake,
  BookOpen,
  Settings,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  exact?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Tổng Quan',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: 'Quản Lý Đặt Chỗ',
    href: '/admin/bookings',
    icon: CalendarDays,
  },
  {
    label: 'Danh Mục & Dịch Vụ',
    href: '/admin/destinations',
    icon: SlidersHorizontal,
  },
  {
    label: 'Bài Đăng',
    href: '/admin/experiences',
    icon: Layers,
  },
  {
    label: 'Hội Viên VIP',
    href: '/admin/members',
    icon: Users,
  },
  {
    label: 'Đăng Ký Đối Tác',
    href: '/admin/partners',
    icon: Handshake,
  },
  {
    label: 'Tạp Chí & Bài Viết',
    href: '/admin/posts',
    icon: BookOpen,
  },
  {
    label: 'Cài Đặt Hệ Thống',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/10 p-6 flex flex-col justify-between shrink-0 font-sans">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Link href="/" className="font-serif tracking-[0.22em] text-sm text-white font-bold inline-flex items-center">
            <span>LAURA</span>
            <span className="text-[var(--gold)] text-xs font-mono ml-1.5 font-normal">QUẢN TRỊ</span>
          </Link>
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname?.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium uppercase tracking-wider transition-all group ${
                  isActive
                    ? 'bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/25 shadow-[0_0_12px_rgba(218,189,126,0.06)]'
                    : 'text-[#888] hover:text-white hover:bg-white/[0.04] border border-transparent'
                }`}
              >
                <Icon
                  size={15}
                  className={`shrink-0 transition-colors ${
                    isActive
                      ? 'text-[var(--gold)]'
                      : 'text-[#777] group-hover:text-[var(--gold-light)]'
                  }`}
                />
                <span className="truncate">{item.label}</span>

                {/* Glowing Gold Underline Indicator on Active */}
                {isActive && (
                  <span className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent rounded-full shadow-[0_0_8px_rgba(218,189,126,0.9)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/10 text-xs text-[#666] flex items-center justify-between">
        <Link href="/" className="hover:text-white transition-colors">
          ← Về Trang Chủ
        </Link>
        <span className="font-mono text-[0.7rem] text-[#555]">v1.2.0 Pro</span>
      </div>
    </aside>
  );
}
