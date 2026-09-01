'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Handshake,
  CheckCircle2,
  XCircle,
  Building2,
  CalendarDays,
  MapPin,
  Layers,
  Users,
  BookOpen,
  Settings,
  Mail,
  Phone,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_PARTNERS, type PartnerRecord } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerRecord[]>(INITIAL_PARTNERS);

  const handleStatus = (id: string, newStatus: PartnerRecord['status']) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
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
              <Handshake size={14} />
              <span>Hồ Sơ Doanh Nghiệp Đối Tác</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Đăng Ký Hợp Tác & Thẩm Định Địa Điểm
            </h1>
            <p className="text-xs sm:text-sm text-[#888] font-light mt-1">
              Xem xét và phê duyệt các yêu cầu đăng ký hợp tác từ các đối tác khách sạn, spa và hộp đêm.
            </p>
          </div>
        </div>

        {/* CHUẨN HÓA BẢNG ĐỐI TÁC (STANDARDIZED UNIFORM TABLE) */}
        <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                  <th className="py-4 px-5 w-[28%]">Tên Địa Điểm / Đối Tác</th>
                  <th className="py-4 px-5 w-[16%]">Dịch Vụ & Thành Phố</th>
                  <th className="py-4 px-5 w-[24%]">Người Liên Hệ</th>
                  <th className="py-4 px-5 w-[20%]">Ghi Chú</th>
                  <th className="py-4 px-5 w-[12%] text-right">Phê Duyệt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#ccc]">
                {partners.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Tên đối tác */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-sm font-medium text-white block truncate">
                        {p.businessName}
                      </span>
                    </td>

                    {/* Dịch vụ & Thành phố */}
                    <td className="py-4 px-5 align-middle">
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 text-[var(--gold-light)] border border-[var(--gold)]/20 text-xs font-medium uppercase mb-1">
                        {p.serviceCategory}
                      </span>
                      <span className="text-xs text-[#888] block">📍 {p.destination}</span>
                    </td>

                    {/* Người liên hệ */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-xs font-medium text-white">{p.contactName}</div>
                      <span className="text-xs text-[#777] block mt-0.5">{p.email} · {p.phone}</span>
                    </td>

                    {/* Ghi chú */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-xs text-[#888] line-clamp-2" title={p.description}>
                        "{p.description}"
                      </span>
                    </td>

                    {/* Thao tác */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {p.status === 'new' && (
                          <button
                            type="button"
                            onClick={() => handleStatus(p.id, 'approved')}
                            className="h-8 px-3 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg text-xs font-semibold uppercase transition-colors"
                          >
                            Duyệt
                          </button>
                        )}
                        {p.status === 'approved' && (
                          <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-medium">
                            Đã Duyệt
                          </span>
                        )}
                        {p.status !== 'rejected' && (
                          <button
                            type="button"
                            onClick={() => handleStatus(p.id, 'rejected')}
                            className="h-8 px-2.5 bg-white/5 text-[#888] hover:text-rose-400 rounded-lg text-xs transition-colors"
                          >
                            Từ Chối
                          </button>
                        )}
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
