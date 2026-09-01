'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Crown,
  CalendarDays,
  Handshake,
  BookOpen,
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpRight,
  MapPin,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_BOOKINGS, INITIAL_PARTNERS, INITIAL_MEMBERS, INITIAL_POSTS, type BookingRecord } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);

  const handleStatusChange = (id: string, newStatus: BookingRecord['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const getStatusBadge = (status: BookingRecord['status']) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Đã Xác Nhận
          </span>
        );
      case 'pending':
        return (
          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Chờ Xử Lý
          </span>
        );
      case 'completed':
        return (
          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Hoàn Tất
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-block px-2.5 py-1 text-xs font-medium rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Đã Hủy
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#f3eee5] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Panel */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-xs tracking-wider uppercase font-semibold">
              <ShieldCheck size={14} />
              <span>Trung Tâm Điều Hành Quản Trị</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Bảng Điều Khiển Tổng Quan
            </h1>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
          >
            <span>+ Tạo Lịch Đặt Trực Tiếp</span>
          </Link>
        </div>

        {/* Metrics Overview Cards (Cùng Size & Chiều Cao) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Link
            href="/admin/members"
            className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group h-36"
          >
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-xs uppercase tracking-wider font-medium">Hội Viên VIP</span>
              <Crown size={18} className="text-[var(--gold)]" />
            </div>
            <div>
              <span className="font-serif text-3xl text-white font-normal">{INITIAL_MEMBERS.length}</span>
              <p className="text-xs text-emerald-400 mt-0.5">Đang kích hoạt đặc quyền</p>
            </div>
          </Link>

          <Link
            href="/admin/bookings"
            className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group h-36"
          >
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-xs uppercase tracking-wider font-medium">Lịch Đặt Chờ Duyệt</span>
              <CalendarDays size={18} className="text-[var(--gold)]" />
            </div>
            <div>
              <span className="font-serif text-3xl text-white font-normal">
                {bookings.filter((b) => b.status === 'pending').length}
              </span>
              <p className="text-xs text-amber-400 mt-0.5">Cần quản gia xử lý</p>
            </div>
          </Link>

          <Link
            href="/admin/partners"
            className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group h-36"
          >
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-xs uppercase tracking-wider font-medium">Hồ Sơ Đối Tác</span>
              <Handshake size={18} className="text-[var(--gold)]" />
            </div>
            <div>
              <span className="font-serif text-3xl text-white font-normal">{INITIAL_PARTNERS.length}</span>
              <p className="text-xs text-[#888] mt-0.5">Đã ký kết hợp tác</p>
            </div>
          </Link>

          <Link
            href="/admin/posts"
            className="p-6 rounded-xl bg-[#0c0c0c] border border-white/10 hover:border-[var(--gold)]/40 transition-all flex flex-col justify-between group h-36"
          >
            <div className="flex items-center justify-between text-[#888]">
              <span className="text-xs uppercase tracking-wider font-medium">Bài Viết Tạp Chí</span>
              <BookOpen size={18} className="text-[var(--gold)]" />
            </div>
            <div>
              <span className="font-serif text-3xl text-white font-normal">{INITIAL_POSTS.length}</span>
              <p className="text-xs text-[#888] mt-0.5">Gắn thẻ thành phố & dịch vụ</p>
            </div>
          </Link>
        </div>

        {/* CHUẨN HÓA BẢNG ĐẶT CHỖ GẦN ĐÂY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif text-white font-normal">Lịch Đặt Chỗ Gần Đây</h2>
              <p className="text-xs text-[#888] font-light mt-0.5">Xác nhận hoặc điều phối xe đón tiếp khách hàng.</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs text-[var(--gold-light)] hover:underline flex items-center gap-1 font-medium"
            >
              <span>Xem Tất Cả</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                    <th className="py-4 px-5 w-[16%]">Mã Đặt</th>
                    <th className="py-4 px-5 w-[24%]">Khách Hàng</th>
                    <th className="py-4 px-5 w-[24%]">Địa Điểm & Gói</th>
                    <th className="py-4 px-5 w-[14%]">Thời Gian</th>
                    <th className="py-4 px-5 w-[12%]">Số Tiền</th>
                    <th className="py-4 px-5 w-[10%] text-right">Trạng Thái & Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#ccc]">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-5 align-middle font-mono text-xs text-[var(--gold-light)] font-bold">
                        {booking.referenceCode}
                      </td>
                      <td className="py-4 px-5 align-middle">
                        <span className="text-sm font-medium text-white block truncate">
                          {booking.guestName}
                        </span>
                        <span className="text-xs text-[#777] block mt-0.5 truncate">
                          {booking.guestEmail}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-middle">
                        <span className="text-sm font-medium text-white block truncate">
                          {booking.venueName}
                        </span>
                        <span className="text-xs text-[#777] block mt-0.5 truncate">
                          {booking.packageName}
                        </span>
                      </td>
                      <td className="py-4 px-5 align-middle">
                        <div className="text-xs font-medium text-white">{booking.date}</div>
                        <span className="text-xs text-[#777] block mt-0.5">{booking.timeSlot}</span>
                      </td>
                      <td className="py-4 px-5 align-middle text-sm font-semibold text-white">
                        ${booking.totalAmountUsd} USD
                      </td>
                      <td className="py-4 px-5 align-middle text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {getStatusBadge(booking.status)}
                          {booking.status === 'pending' && (
                            <button
                              type="button"
                              onClick={() => handleStatusChange(booking.id, 'confirmed')}
                              className="h-7 px-2.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black rounded text-[0.7rem] uppercase font-bold transition-colors"
                            >
                              Xác Nhận
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
        </div>
      </main>
    </div>
  );
}
