'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Crown,
  Search,
  CheckCircle2,
  XCircle,
  Building2,
  CalendarDays,
  MapPin,
  Layers,
  Handshake,
  BookOpen,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_MEMBERS, type MemberRecord } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminMembersPage() {
  const [members, setMembers] = useState<MemberRecord[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState('all');

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.role && m.role.toLowerCase().includes(search.toLowerCase()));
    const matchesTier = tierFilter === 'all' || m.tierName === tierFilter;
    return matchesSearch && matchesTier;
  });

  const handleUpgrade = (id: string, newTier: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, tierName: newTier } : m))
    );
  };

  const handleToggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'active' ? 'suspended' : 'active' }
          : m
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#f3eee5] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-xs tracking-wider uppercase font-semibold">
              <Crown size={14} />
              <span>Danh Sách Thượng Khách VIP</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Hội Viên VIP & Quản Trị Đặc Quyền
            </h1>
            <p className="text-xs sm:text-sm text-[#888] font-light mt-1">
              Quản lý danh sách khách hàng thượng lưu, phân cấp đặc quyền và trạng thái hội viên.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-3 text-[#666]" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email, bí danh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Hạng Mức</option>
              <option value="curated">Curated Access</option>
              <option value="privilege">Privilege Patron</option>
              <option value="sovereign">Sovereign Black</option>
            </select>

            <span className="text-xs text-[#777] ml-auto font-medium">
              Tổng số: {filteredMembers.length}
            </span>
          </div>
        </div>

        {/* CHUẨN HÓA BẢNG HỘI VIÊN (STANDARDIZED UNIFORM TABLE) */}
        <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                  <th className="py-4 px-5 w-[28%]">Hội Viên</th>
                  <th className="py-4 px-5 w-[24%]">Email & Liên Hệ</th>
                  <th className="py-4 px-5 w-[16%]">Hạng Mức</th>
                  <th className="py-4 px-5 w-[14%]">Ngày Tham Gia</th>
                  <th className="py-4 px-5 w-[10%]">Trạng Thái</th>
                  <th className="py-4 px-5 w-[8%] text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#ccc]">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Hội viên */}
                    <td className="py-4 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-[var(--gold)]/10 text-[var(--gold)] flex items-center justify-center font-bold text-sm border border-[var(--gold)]/30 shrink-0">
                          {m.fullName[0]}
                        </div>
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-white block truncate">
                            {m.fullName}
                          </span>
                          <span className="text-xs text-[#777] block mt-0.5 truncate">
                            Vai trò: {m.role ? m.role.toUpperCase() : 'MEMBER'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Email & Liên hệ */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-xs font-medium text-white truncate">{m.email}</div>
                      <span className="text-xs text-[#777] block mt-0.5">{m.phone}</span>
                    </td>

                    {/* Hạng mức */}
                    <td className="py-4 px-5 align-middle">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/25 uppercase">
                        {m.tierName || 'VIP'}
                      </span>
                    </td>

                    {/* Ngày tham gia */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-xs text-[#aaa] font-medium">{m.memberSince}</span>
                    </td>

                    {/* Trạng thái */}
                    <td className="py-4 px-5 align-middle">
                      <span
                        className={`inline-block px-2.5 py-1 text-xs rounded-md font-medium ${
                          m.status === 'active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                      >
                        {m.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </td>

                    {/* Nâng hạng / Thao tác */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="inline-flex items-center gap-2">
                        <select
                          value={m.tierName}
                          onChange={(e) => handleUpgrade(m.id, e.target.value)}
                          className="h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-xs text-white focus:outline-none"
                        >
                          <option value="The Privé Tier">The Privé Tier</option>
                          <option value="The Obsidian Reserve">The Obsidian Reserve</option>
                          <option value="Single Access Pass">Single Access Pass</option>
                          <option value="Executive Concierge Admin">Executive Concierge Admin</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(m.id)}
                          className="h-8 px-3 bg-white/5 hover:bg-white/10 text-[#aaa] hover:text-white rounded-lg text-xs font-medium transition-colors"
                        >
                          {m.status === 'active' ? 'Khóa' : 'Mở'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
