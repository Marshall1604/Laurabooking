'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  MapPin,
  CheckCircle2,
  XCircle,
  Building2,
  Layers,
  Users,
  Handshake,
  BookOpen,
  Settings,
  CalendarDays,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Save,
  X,
  Wine,
  Flame,
  Globe,
  SlidersHorizontal,
  Search,
} from 'lucide-react';
import {
  INITIAL_DESTINATIONS,
  INITIAL_SERVICES,
  type DestinationRecord,
  type ServiceRecord,
} from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminDestinationsPage() {
  const [activeTab, setActiveTab] = useState<'destinations' | 'services'>('destinations');

  // Destinations State
  const [destinations, setDestinations] = useState<DestinationRecord[]>(INITIAL_DESTINATIONS);

  // Services State
  const [services, setServices] = useState<ServiceRecord[]>(INITIAL_SERVICES);

  const [savedSuccess, setSavedSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Modals state
  const [editingDest, setEditingDest] = useState<DestinationRecord | null>(null);
  const [isAddingDest, setIsAddingDest] = useState(false);

  const [editingService, setEditingService] = useState<ServiceRecord | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  // Filtered lists
  const filteredDestinations = destinations.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && d.isActive !== false) ||
      (statusFilter === 'inactive' && d.isActive === false);
    return matchesSearch && matchesStatus;
  });

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && s.isActive !== false) ||
      (statusFilter === 'inactive' && s.isActive === false);
    return matchesSearch && matchesStatus;
  });

  // Load from localStorage
  useEffect(() => {
    try {
      const savedD = localStorage.getItem('aurelis_destinations');
      if (savedD) {
        setDestinations(JSON.parse(savedD));
      }

      const savedS = localStorage.getItem('aurelis_services');
      if (savedS) {
        setServices(JSON.parse(savedS));
      }
    } catch {}
  }, []);

  const showNotification = (msg: string) => {
    setSavedSuccess(msg);
    setTimeout(() => setSavedSuccess(''), 3000);
  };

  // --- DESTINATIONS HANDLERS ---
  const saveDestinations = (updated: DestinationRecord[], msg = 'Đã cập nhật danh sách điểm đến!') => {
    setDestinations(updated);
    try {
      localStorage.setItem('aurelis_destinations', JSON.stringify(updated));
      window.dispatchEvent(new Event('aurelis_destinations_updated'));
      showNotification(msg);
    } catch {}
  };

  const handleToggleDest = (id: string) => {
    const updated = destinations.map((d) =>
      d.id === id ? { ...d, isActive: !d.isActive } : d
    );
    saveDestinations(updated, 'Đã cập nhật trạng thái hiển thị điểm đến!');
  };

  const handleMoveDest = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= destinations.length) return;
    const updated = [...destinations];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    saveDestinations(updated, 'Đã cập nhật thứ tự hiển thị điểm đến!');
  };

  const handleDeleteDest = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa điểm đến "${name}"?`)) {
      const updated = destinations.filter((d) => d.id !== id);
      saveDestinations(updated, `Đã xóa điểm đến "${name}"!`);
    }
  };

  const handleSaveDestModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDest) return;
    let updated: DestinationRecord[];
    if (isAddingDest) {
      updated = [...destinations, { ...editingDest, id: `dest-${Date.now()}` }];
    } else {
      updated = destinations.map((d) => (d.id === editingDest.id ? editingDest : d));
    }
    saveDestinations(updated, isAddingDest ? 'Đã thêm điểm đến mới!' : 'Đã lưu thay đổi điểm đến!');
    setEditingDest(null);
    setIsAddingDest(false);
  };

  // --- SERVICES HANDLERS ---
  const saveServices = (updated: ServiceRecord[], msg = 'Đã cập nhật danh sách dịch vụ!') => {
    setServices(updated);
    try {
      localStorage.setItem('aurelis_services', JSON.stringify(updated));
      window.dispatchEvent(new Event('aurelis_services_updated'));
      showNotification(msg);
    } catch {}
  };

  const handleToggleService = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, isActive: !s.isActive } : s
    );
    saveServices(updated, 'Đã cập nhật trạng thái hiển thị dịch vụ!');
  };

  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= services.length) return;
    const updated = [...services];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIdx, 0, moved);
    saveServices(updated, 'Đã cập nhật thứ tự hiển thị dịch vụ!');
  };

  const handleDeleteService = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa dịch vụ "${name}"?`)) {
      const updated = services.filter((s) => s.id !== id);
      saveServices(updated, `Đã xóa dịch vụ "${name}"!`);
    }
  };

  const handleSaveServiceModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    let updated: ServiceRecord[];
    if (isAddingService) {
      updated = [...services, { ...editingService, id: `srv-${Date.now()}` }];
    } else {
      updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    }
    saveServices(updated, isAddingService ? 'Đã thêm dịch vụ mới!' : 'Đã lưu thay đổi dịch vụ!');
    setEditingService(null);
    setIsAddingService(false);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#f3eee5] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-[0.68rem] tracking-[0.2em] uppercase font-semibold">
              <SlidersHorizontal size={13} />
              <span>Quản Trị Bật / Tắt, Thay Ảnh & Sắp Xếp Danh Mục</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Quản Trị Điểm Đến & Dịch Vụ
            </h1>
            <p className="text-xs text-[#888] font-light mt-0.5">
              Tùy chỉnh bật/tắt, thay đổi ảnh bìa cover, thêm, xóa và sắp xếp thứ tự hiển thị trên Menu và các trang chi tiết.
            </p>
          </div>

          {savedSuccess && (
            <div className="px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono flex items-center gap-2 shadow-lg">
              <CheckCircle2 size={15} />
              <span>{savedSuccess}</span>
            </div>
          )}
        </div>

        {/* CLUSTERS TAB SELECTOR & HEADER ACTIONS */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="inline-flex items-center p-1 rounded-xl bg-[#0e0e0e] border border-white/10 w-fit">
            <button
              type="button"
              onClick={() => {
                setActiveTab('destinations');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'destinations'
                  ? 'bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-black shadow-lg'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              <MapPin size={13} />
              <span>Điểm Đến & Thành Phố ({destinations.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('services');
                setSearchQuery('');
                setStatusFilter('all');
              }}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === 'services'
                  ? 'bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-black shadow-lg'
                  : 'text-[#888] hover:text-white'
              }`}
            >
              <Sparkles size={13} />
              <span>Dịch Vụ & Bộ Sưu Tập ({services.length})</span>
            </button>
          </div>

          {/* Add New Button */}
          {activeTab === 'destinations' ? (
            <button
              type="button"
              onClick={() => {
                setEditingDest({
                  id: '',
                  slug: '',
                  name: '',
                  tagline: '',
                  venueCount: 5,
                  image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80',
                  description: '',
                  curatedVibe: 'Luxury · Private · Curated',
                  isActive: true,
                });
                setIsAddingDest(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
            >
              <Plus size={15} />
              <span>Thêm Điểm Đến Mới</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEditingService({
                  id: '',
                  slug: '',
                  name: '',
                  category: 'Dịch Vụ Mới',
                  tagline: '',
                  description: '',
                  fullDetails: '',
                  image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=85',
                  duration: '120 Phút',
                  guestCapacity: '2 - 6 Khách',
                  location: 'Toàn Quốc',
                  fromPriceUsd: 200,
                  fromPriceVnd: 5000000,
                  iconName: 'Sparkles',
                  isActive: true,
                });
                setIsAddingService(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
            >
              <Plus size={15} />
              <span>Thêm Dịch Vụ Mới</span>
            </button>
          )}
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-3 text-[#666]" />
            <input
              type="text"
              placeholder={activeTab === 'destinations' ? 'Tìm kiếm thành phố, điểm đến...' : 'Tìm kiếm dịch vụ, bộ sưu tập...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Trạng Thái</option>
              <option value="active">Đang Hiển Thị</option>
              <option value="inactive">Đã Tắt / Ẩn</option>
            </select>

            <span className="text-xs text-[#777] ml-auto font-medium">
              Tổng số: {activeTab === 'destinations' ? filteredDestinations.length : filteredServices.length}
            </span>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CLUSTER 1: DESTINATIONS & CITIES TABLE */}
        {/* ======================================================== */}
        {activeTab === 'destinations' && (
          <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                    <th className="py-4 px-4 w-[10%] text-center">Thứ Tự</th>
                    <th className="py-4 px-5 w-[32%]">Thành Phố & Điểm Đến</th>
                    <th className="py-4 px-5 w-[26%]">Khẩu Hiệu / Tagline</th>
                    <th className="py-4 px-5 w-[12%]">Quy Mô</th>
                    <th className="py-4 px-5 w-[10%] text-center">Trạng Thái</th>
                    <th className="py-4 px-5 w-[10%] text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#ccc]">
                  {filteredDestinations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#666]">
                        Không tìm thấy điểm đến nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredDestinations.map((d) => {
                      const originalIdx = destinations.findIndex((item) => item.id === d.id);
                      return (
                        <tr key={d.id} className="hover:bg-white/[0.02] transition-colors">
                          {/* Thứ tự & nút di chuyển */}
                          <td className="py-4 px-4 align-middle text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
                                <button
                                  type="button"
                                  disabled={originalIdx === 0}
                                  onClick={() => handleMoveDest(originalIdx, 'up')}
                                  className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-20 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                  title="Di chuyển lên trên"
                                >
                                  <ArrowUp size={12} />
                                </button>
                                <div className="w-[1px] h-3 bg-white/10" />
                                <button
                                  type="button"
                                  disabled={originalIdx === destinations.length - 1}
                                  onClick={() => handleMoveDest(originalIdx, 'down')}
                                  className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-20 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                  title="Di chuyển xuống dưới"
                                >
                                  <ArrowDown size={12} />
                                </button>
                              </div>
                              <span className="font-mono text-xs text-[var(--gold)] font-bold">#{originalIdx + 1}</span>
                            </div>
                          </td>

                          {/* Tên & Thumbnail */}
                          <td className="py-4 px-5 align-middle">
                            <div className="flex items-center gap-3.5">
                              <div className="relative group shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#161616] shadow-sm">
                                <div
                                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                  style={{ backgroundImage: `url(${d.image})` }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingDest(d);
                                    setIsAddingDest(false);
                                  }}
                                  className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[0.6rem] text-[var(--gold-light)] font-medium transition-opacity cursor-pointer p-0.5 text-center backdrop-blur-xs"
                                >
                                  <ImageIcon size={12} className="text-[var(--gold)] mb-0.5" />
                                  <span>Đổi ảnh</span>
                                </button>
                              </div>
                              <div className="min-w-0">
                                <span className="text-sm font-medium text-white block truncate">
                                  {d.name}
                                </span>
                                <span className="text-xs text-[#777] block mt-0.5 font-mono truncate">
                                  /destinations/{d.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Tagline & Description */}
                          <td className="py-4 px-5 align-middle">
                            <div className="text-xs text-[var(--gold-light)] italic font-light truncate">
                              {d.tagline || '—'}
                            </div>
                            <div className="text-[0.7rem] text-[#777] line-clamp-1 mt-0.5 font-light">
                              {d.description}
                            </div>
                          </td>

                          {/* Quy mô */}
                          <td className="py-4 px-5 align-middle">
                            <span className="inline-block px-2.5 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold-light)] text-xs font-medium">
                              {d.venueCount} Địa Điểm
                            </span>
                          </td>

                          {/* Trạng thái Bật/Tắt */}
                          <td className="py-4 px-5 align-middle text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleDest(d.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                d.isActive
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                              }`}
                              title={d.isActive ? 'Nhấn để tắt hiển thị' : 'Nhấn để bật hiển thị'}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  d.isActive ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-rose-400'
                                }`}
                              />
                              <span>{d.isActive ? 'Đang Bật' : 'Đã Tắt'}</span>
                            </button>
                          </td>

                          {/* Thao tác */}
                          <td className="py-4 px-5 align-middle text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/destinations/${d.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888] hover:text-[var(--gold-light)] transition-colors"
                                title="Xem trang thực tế"
                              >
                                <ExternalLink size={14} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingDest(d);
                                  setIsAddingDest(false);
                                }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                                title="Chỉnh sửa thông tin & ảnh bìa"
                              >
                                <Edit3 size={14} className="text-[var(--gold)]" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteDest(d.id, d.name)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                title="Xóa điểm đến"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CLUSTER 2: SERVICES & COLLECTIONS TABLE */}
        {/* ======================================================== */}
        {activeTab === 'services' && (
          <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                    <th className="py-4 px-4 w-[10%] text-center">Thứ Tự</th>
                    <th className="py-4 px-5 w-[32%]">Dịch Vụ & Ảnh Bìa</th>
                    <th className="py-4 px-5 w-[26%]">Phân Loại & Tagline</th>
                    <th className="py-4 px-5 w-[12%]">Giá Khởi Điểm</th>
                    <th className="py-4 px-5 w-[10%] text-center">Trạng Thái</th>
                    <th className="py-4 px-5 w-[10%] text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-[#ccc]">
                  {filteredServices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#666]">
                        Không tìm thấy dịch vụ nào phù hợp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    filteredServices.map((s) => {
                      const originalIdx = services.findIndex((item) => item.id === s.id);
                      return (
                        <tr key={s.id} className="hover:bg-white/[0.02] transition-colors">
                          {/* Thứ tự & nút di chuyển */}
                          <td className="py-4 px-4 align-middle text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.02] p-0.5">
                                <button
                                  type="button"
                                  disabled={originalIdx === 0}
                                  onClick={() => handleMoveService(originalIdx, 'up')}
                                  className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-20 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                  title="Di chuyển lên trên"
                                >
                                  <ArrowUp size={12} />
                                </button>
                                <div className="w-[1px] h-3 bg-white/10" />
                                <button
                                  type="button"
                                  disabled={originalIdx === services.length - 1}
                                  onClick={() => handleMoveService(originalIdx, 'down')}
                                  className="w-6 h-6 flex items-center justify-center text-[#888] hover:text-white disabled:opacity-20 hover:bg-white/10 rounded transition-colors cursor-pointer"
                                  title="Di chuyển xuống dưới"
                                >
                                  <ArrowDown size={12} />
                                </button>
                              </div>
                              <span className="font-mono text-xs text-[var(--gold)] font-bold">#{originalIdx + 1}</span>
                            </div>
                          </td>

                          {/* Tên & Thumbnail */}
                          <td className="py-4 px-5 align-middle">
                            <div className="flex items-center gap-3.5">
                              <div className="relative group shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-white/10 bg-[#161616] shadow-sm">
                                <div
                                  className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                                  style={{ backgroundImage: `url(${s.image})` }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingService(s);
                                    setIsAddingService(false);
                                  }}
                                  className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-[0.6rem] text-[var(--gold-light)] font-medium transition-opacity cursor-pointer p-0.5 text-center backdrop-blur-xs"
                                >
                                  <ImageIcon size={12} className="text-[var(--gold)] mb-0.5" />
                                  <span>Đổi ảnh</span>
                                </button>
                              </div>
                              <div className="min-w-0">
                                <span className="text-sm font-medium text-white block truncate">
                                  {s.name}
                                </span>
                                <span className="text-xs text-[#777] block mt-0.5 font-mono truncate">
                                  /services/{s.slug}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Phân loại & Tagline */}
                          <td className="py-4 px-5 align-middle">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold-light)] text-[0.7rem] font-medium">
                                {s.category}
                              </span>
                            </div>
                            <div className="text-xs text-[var(--gold-light)]/90 italic font-light truncate">
                              {s.tagline || '—'}
                            </div>
                          </td>

                          {/* Giá khởi điểm */}
                          <td className="py-4 px-5 align-middle">
                            <div className="text-sm font-semibold text-[var(--gold-light)]">
                              ${s.fromPriceUsd} USD
                            </div>
                            <span className="text-[0.7rem] text-[#777] block mt-0.5 font-mono">
                              {(s.fromPriceVnd || s.fromPriceUsd * 25000).toLocaleString('vi-VN')} đ
                            </span>
                          </td>

                          {/* Trạng thái Bật/Tắt */}
                          <td className="py-4 px-5 align-middle text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleService(s.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                                s.isActive
                                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                                  : 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20'
                              }`}
                              title={s.isActive ? 'Nhấn để tắt hiển thị' : 'Nhấn để bật hiển thị'}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  s.isActive ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]' : 'bg-rose-400'
                                }`}
                              />
                              <span>{s.isActive ? 'Đang Bật' : 'Đã Tắt'}</span>
                            </button>
                          </td>

                          {/* Thao tác */}
                          <td className="py-4 px-5 align-middle text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/services/${s.slug}`}
                                target="_blank"
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#888] hover:text-[var(--gold-light)] transition-colors"
                                title="Xem trang thực tế"
                              >
                                <ExternalLink size={14} />
                              </Link>

                              <button
                                type="button"
                                onClick={() => {
                                  setEditingService(s);
                                  setIsAddingService(false);
                                }}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
                                title="Chỉnh sửa thông tin & ảnh bìa"
                              >
                                <Edit3 size={14} className="text-[var(--gold)]" />
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteService(s.id, s.name)}
                                className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                                title="Xóa dịch vụ"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* EDIT / ADD DESTINATION MODAL */}
        {/* ======================================================== */}
        {editingDest && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0e0e0e] border border-[var(--gold)]/40 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-[var(--gold-light)] font-serif text-lg">
                  <MapPin size={18} />
                  <span>{isAddingDest ? 'Thêm Điểm Đến Mới' : `Chỉnh Sửa: ${editingDest.name}`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingDest(null)}
                  className="p-1.5 text-[#888] hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveDestModal} className="space-y-4 text-xs">
                {/* Image Preview & URL */}
                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">
                    Ảnh Bìa Cover (Image URL) *
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-white/15 bg-[#181818]"
                      style={{ backgroundImage: `url(${editingDest.image})` }}
                    />
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={editingDest.image}
                        onChange={(e) => setEditingDest({ ...editingDest, image: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none font-mono text-xs"
                      />
                      <p className="text-[0.68rem] text-[#777]">
                        Dán link ảnh chất lượng cao (Unsplash hoặc CDN) để làm ảnh nền Hero & Danh mục.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Tên Điểm Đến *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Da Nang & Hoi An"
                      value={editingDest.name}
                      onChange={(e) => setEditingDest({ ...editingDest, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Slug Đường Dẫn *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: da-nang"
                      value={editingDest.slug}
                      onChange={(e) => setEditingDest({ ...editingDest, slug: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">Khẩu Hiệu (Tagline)</label>
                  <input
                    type="text"
                    placeholder="VD: Coastal serenity and lantern-lit evenings."
                    value={editingDest.tagline}
                    onChange={(e) => setEditingDest({ ...editingDest, tagline: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none italic"
                  />
                </div>

                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">Mô Tả Chi Tiết</label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả điểm nhấn và trải nghiệm tại điểm đến..."
                    value={editingDest.description}
                    onChange={(e) => setEditingDest({ ...editingDest, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Số Lượng Địa Điểm</label>
                    <input
                      type="number"
                      min={0}
                      value={editingDest.venueCount}
                      onChange={(e) => setEditingDest({ ...editingDest, venueCount: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Phong Cách (Vibe)</label>
                    <input
                      type="text"
                      placeholder="Serene · Oceanic · Zen"
                      value={editingDest.curatedVibe}
                      onChange={(e) => setEditingDest({ ...editingDest, curatedVibe: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingDest(null)}
                    className="px-4 py-2 rounded-lg text-[#aaa] hover:text-white hover:bg-white/5"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-black font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* EDIT / ADD SERVICE MODAL */}
        {/* ======================================================== */}
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0e0e0e] border border-[var(--gold)]/40 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-[var(--gold-light)] font-serif text-lg">
                  <Sparkles size={18} />
                  <span>{isAddingService ? 'Thêm Dịch Vụ Mới' : `Chỉnh Sửa Dịch Vụ: ${editingService.name}`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="p-1.5 text-[#888] hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSaveServiceModal} className="space-y-4 text-xs">
                {/* Image Preview & URL */}
                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">
                    Ảnh Bìa Cover Dịch Vụ (Image URL) *
                  </label>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-white/15 bg-[#181818]"
                      style={{ backgroundImage: `url(${editingService.image})` }}
                    />
                    <div className="flex-1 space-y-1.5">
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/..."
                        value={editingService.image}
                        onChange={(e) => setEditingService({ ...editingService, image: e.target.value })}
                        className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none font-mono text-xs"
                      />
                      <p className="text-[0.68rem] text-[#777]">
                        Dán link ảnh độ phân giải cao để làm ảnh bìa cho trang /services/{editingService.slug || 'slug'}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Tên Dịch Vụ *</label>
                    <input
                      type="text"
                      required
                      placeholder="VD: Penthouse Wellness & Spa"
                      value={editingService.name}
                      onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Slug Đường Dẫn *</label>
                    <input
                      type="text"
                      required
                      placeholder="massage-spa / wine-tasting-cellar / night-club"
                      value={editingService.slug}
                      onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Phân Loại (Category)</label>
                    <input
                      type="text"
                      placeholder="Sức Khỏe & Thư Giãn / Thưởng Rượu / Nightlife"
                      value={editingService.category}
                      onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[#aaa] uppercase font-semibold mb-1">Khẩu Hiệu (Tagline)</label>
                    <input
                      type="text"
                      placeholder="Trị liệu cá nhân hóa trên đỉnh đô thị."
                      value={editingService.tagline}
                      onChange={(e) => setEditingService({ ...editingService, tagline: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none italic"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">Mô Tả Ngắn</label>
                  <textarea
                    rows={2}
                    placeholder="Mô tả tóm tắt dịch vụ..."
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#aaa] uppercase font-semibold mb-1">Chi Tiết Trải Nghiệm (Full Details)</label>
                  <textarea
                    rows={3}
                    placeholder="Chi tiết quy chuẩn phục vụ, điểm đặc biệt..."
                    value={editingService.fullDetails || ''}
                    onChange={(e) => setEditingService({ ...editingService, fullDetails: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#141414] border border-white/15 text-white focus:border-[var(--gold)] focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 rounded-lg text-[#aaa] hover:text-white hover:bg-white/5"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] text-black font-bold uppercase tracking-wider shadow-lg cursor-pointer"
                  >
                    <Save size={14} />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
