'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Building2,
  MapPin,
  Layers,
  Users,
  Handshake,
  BookOpen,
  Settings,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_BOOKINGS, type BookingRecord } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.referenceCode.toLowerCase().includes(search.toLowerCase()) ||
      b.guestName.toLowerCase().includes(search.toLowerCase()) ||
      b.guestEmail.toLowerCase().includes(search.toLowerCase()) ||
      b.venueName.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    const matchesService = serviceFilter === 'all' || b.serviceSlug === serviceFilter;

    return matchesSearch && matchesStatus && matchesService;
  });

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const exportCSV = () => {
    const headers = ['Mã Đặt Chỗ', 'Khách Hàng', 'Email', 'SĐT', 'Địa Điểm', 'Gói Dịch Vụ', 'Ngày', 'Giờ', 'Số Tiền (USD)', 'Trạng Thái'];
    const rows = filteredBookings.map((b) => [
      b.referenceCode,
      `"${b.guestName}"`,
      b.guestEmail,
      b.guestPhone,
      `"${b.venueName}"`,
      `"${b.packageName}"`,
      b.date,
      b.timeSlot,
      b.totalAmountUsd,
      b.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aurelis_danh_sach_dat_cho_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              <CalendarDays size={14} />
              <span>Sổ Cái Đặt Chỗ Thượng Khách</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Quản Lý Lịch Đặt Chỗ
            </h1>
            <p className="text-xs sm:text-sm text-[#888] font-light mt-1">
              Theo dõi và xác nhận các yêu cầu đặt chỗ từ khách hàng và thành viên VIP.
            </p>
          </div>

          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-lg text-xs uppercase tracking-wider font-semibold transition-colors shrink-0"
          >
            <Download size={14} />
            <span>Xuất File CSV</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-3 text-[#666]" />
            <input
              type="text"
              placeholder="Tìm mã đặt, tên khách..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Trạng Thái</option>
              <option value="pending">Chờ Xử Lý</option>
              <option value="confirmed">Đã Xác Nhận</option>
              <option value="completed">Đã Hoàn Tất</option>
              <option value="cancelled">Đã Hủy</option>
            </select>

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Dịch Vụ</option>
              <option value="massage-spa">Massage & Spa</option>
              <option value="wine-tasting-cellar">Wine Tasting Cellar</option>
              <option value="night-club">Night Club</option>
            </select>
          </div>
        </div>

        {/* CHUẨN HÓA BẢNG ĐẶT CHỖ (STANDARDIZED UNIFORM TABLE) */}
        <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                  <th className="py-4 px-5 w-[14%]">Mã Đặt</th>
                  <th className="py-4 px-5 w-[24%]">Khách Hàng</th>
                  <th className="py-4 px-5 w-[24%]">Địa Điểm & Gói Đặt</th>
                  <th className="py-4 px-5 w-[14%]">Ngày Giờ</th>
                  <th className="py-4 px-5 w-[12%]">Số Tiền</th>
                  <th className="py-4 px-5 w-[12%] text-right">Trạng Thái & Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#ccc]">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Mã đặt */}
                    <td className="py-4 px-5 align-middle">
                      <span className="font-mono text-xs font-bold text-[var(--gold-light)] block">
                        {b.referenceCode}
                      </span>
                    </td>

                    {/* Khách hàng */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-sm font-medium text-white block truncate">
                        {b.guestName}
                      </span>
                      <span className="text-xs text-[#777] block mt-0.5 truncate">
                        {b.guestEmail} · {b.guestPhone}
                      </span>
                    </td>

                    {/* Địa điểm & Gói */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-sm font-medium text-white block truncate">
                        {b.venueName}
                      </span>
                      <span className="text-xs text-[#777] block mt-0.5 truncate">
                        {b.packageName}
                      </span>
                    </td>

                    {/* Ngày giờ */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-xs font-medium text-white">{b.date}</div>
                      <span className="text-xs text-[#777] block mt-0.5">{b.timeSlot}</span>
                    </td>

                    {/* Số tiền */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-sm font-semibold text-white">
                        ${b.totalAmountUsd} USD
                      </div>
                    </td>

                    {/* Trạng thái & Thao tác */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="inline-flex items-center gap-2">
                        {b.status === 'pending' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            className="h-8 px-3 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded-lg text-xs font-semibold uppercase transition-colors"
                          >
                            Xác Nhận
                          </button>
                        )}
                        {b.status === 'confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            className="h-8 px-3 bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg text-xs font-semibold uppercase transition-colors"
                          >
                            Hoàn Tất
                          </button>
                        )}
                        {b.status === 'completed' && (
                          <span className="inline-block px-2.5 py-1 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-md font-medium">
                            Đã Xong
                          </span>
                        )}
                        {b.status === 'cancelled' && (
                          <span className="inline-block px-2.5 py-1 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md font-medium">
                            Đã Hủy
                          </span>
                        )}
                        {b.status !== 'cancelled' && b.status !== 'completed' && (
                          <button
                            type="button"
                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                            className="h-8 w-8 bg-white/5 hover:bg-rose-500 hover:text-white text-[#666] rounded-lg transition-colors inline-flex items-center justify-center"
                            title="Hủy đặt chỗ"
                          >
                            <XCircle size={14} />
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
