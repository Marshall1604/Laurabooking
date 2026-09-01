'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Building2,
  MapPin,
  Clock,
  Users,
  Edit,
  Trash2,
  Check,
  X,
  Sparkles,
  Search,
  Layers,
  FileText,
  DollarSign,
  CalendarDays,
  Handshake,
  BookOpen,
  Settings,
  Image as ImageIcon,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_VENUES, type VenueData } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminExperiencesPage() {
  const [venues, setVenues] = useState<VenueData[]>(INITIAL_VENUES);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterCity, setFilterCity] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVenueId, setEditingVenueId] = useState<string | null>(null);
  const [notification, setNotification] = useState('');

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('aurelis_venues');
      if (saved) {
        setVenues(JSON.parse(saved));
      }
    } catch {}
  }, []);

  const saveToStorage = (data: VenueData[]) => {
    setVenues(data);
    try {
      localStorage.setItem('aurelis_venues', JSON.stringify(data));
    } catch {}
  };

  const defaultFormData: VenueData = {
    id: '',
    name: '',
    slug: '',
    serviceSlug: 'massage-spa',
    destinationSlug: 'ho-chi-minh-city',
    address: '',
    neighborhood: '',
    openingHours: '10:00 - 23:30',
    capacity: 6,
    priceFromUsd: 200,
    priceFromVnd: 5000000,
    heroImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    gallery: [],
    highlights: ['Private Bespoke Service', 'Strict Confidentiality NDA', 'Dedicated Private Elevator'],
    promoTitle: '',
    promoExcerpt: '',
    promoStory: '',
    packages: [
      {
        id: 'pkg-1',
        name: 'Gói Trải Nghiệm Cao Cấp (Standard VIP)',
        durationMins: 120,
        priceUsd: 200,
        priceVnd: 5000000,
        maxGuests: 2,
        inclusions: ['Đồ uống chào mừng', 'Dịch vụ độc quyền', 'Hỗ trợ quản gia riêng'],
      },
    ],
  };

  const [formData, setFormData] = useState<VenueData>(defaultFormData);

  const handleOpenAddModal = () => {
    setEditingVenueId(null);
    setFormData({
      ...defaultFormData,
      id: `ven-${Date.now()}`,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (venue: VenueData) => {
    setEditingVenueId(venue.id);
    setFormData(JSON.parse(JSON.stringify(venue)));
    setIsModalOpen(true);
  };

  const handleDeleteVenue = (id: string, name: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa địa điểm "${name}" khỏi hệ thống không?`)) {
      const updated = venues.filter((v) => v.id !== id);
      saveToStorage(updated);
      showNotification(`Đã xóa thành công địa điểm "${name}".`);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

  const handleSaveVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const preparedData: VenueData = {
      ...formData,
      slug,
      priceFromUsd:
        formData.packages.length > 0
          ? Math.min(...formData.packages.map((p) => p.priceUsd))
          : formData.priceFromUsd,
      priceFromVnd:
        (formData.packages.length > 0
          ? Math.min(...formData.packages.map((p) => p.priceUsd))
          : formData.priceFromUsd) * 25000,
    };

    let updated: VenueData[];
    if (editingVenueId) {
      updated = venues.map((v) => (v.id === editingVenueId ? preparedData : v));
      showNotification(`Đã cập nhật thông tin "${preparedData.name}".`);
    } else {
      updated = [preparedData, ...venues];
      showNotification(`Đã thêm mới địa điểm "${preparedData.name}".`);
    }

    saveToStorage(updated);
    setIsModalOpen(false);
  };

  const handleAddPackage = () => {
    const newPkg = {
      id: `pkg-${Date.now()}`,
      name: `Gói Dịch Vụ Mới #${formData.packages.length + 1}`,
      durationMins: 90,
      priceUsd: 150,
      priceVnd: 3750000,
      maxGuests: 2,
      inclusions: ['Đồ uống chào mừng', 'Phục vụ riêng'],
    };
    setFormData({
      ...formData,
      packages: [...formData.packages, newPkg],
    });
  };

  const handleUpdatePackage = (pkgId: string, field: string, value: any) => {
    setFormData({
      ...formData,
      packages: formData.packages.map((p) => {
        if (p.id === pkgId) {
          const updatedPkg = { ...p, [field]: value };
          if (field === 'priceUsd') {
            updatedPkg.priceVnd = Number(value) * 25000;
          }
          return updatedPkg;
        }
        return p;
      }),
    });
  };

  const handleRemovePackage = (pkgId: string) => {
    if (formData.packages.length <= 1) {
      alert('Mỗi địa điểm phải có tối thiểu 1 gói dịch vụ!');
      return;
    }
    setFormData({
      ...formData,
      packages: formData.packages.filter((p) => p.id !== pkgId),
    });
  };

  const getServiceLabel = (slug: string) => {
    if (slug === 'massage-spa') return 'Massage & Spa';
    if (slug === 'wine-tasting-cellar') return 'Wine Tasting Cellar';
    if (slug === 'night-club') return 'Night Club';
    return slug;
  };

  const getCityLabel = (slug: string) => {
    if (slug === 'ho-chi-minh-city') return 'TP. Hồ Chí Minh';
    if (slug === 'da-nang') return 'Đà Nẵng & Hội An';
    if (slug === 'vung-tau') return 'Vũng Tàu';
    if (slug === 'phu-quoc') return 'Đảo Phú Quốc';
    if (slug === 'nha-trang') return 'Nha Trang & Cam Ranh';
    return slug;
  };

  const filteredVenues = venues.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesService = filterService === 'all' || v.serviceSlug === filterService;
    const matchesCity = filterCity === 'all' || v.destinationSlug === filterCity;
    return matchesSearch && matchesService && matchesCity;
  });

  return (
    <div className="min-h-screen bg-[#060606] text-[#f3eee5] flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 sm:p-10 space-y-6 overflow-auto">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[var(--gold-light)] text-xs tracking-wider uppercase font-semibold">
              <Layers size={14} />
              <span>Quản Lý Địa Điểm & Bài Viết</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Địa Điểm & Gói Trải Nghiệm
            </h1>
            <p className="text-xs sm:text-sm text-[#888] font-light mt-1">
              Thêm mới địa điểm, soạn bài viết quảng cáo và quản lý các gói giá dịch vụ.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus size={15} />
            <span>Thêm Địa Điểm Mới</span>
          </button>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            ✓ {notification}
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-3 text-[#666]" />
            <input
              type="text"
              placeholder="Tìm kiếm địa điểm, khu vực..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white placeholder:text-[#555] focus:outline-none focus:border-[var(--gold)] transition-colors"
            />
          </div>

          <div className="flex flex-wrap gap-2.5 w-full md:w-auto items-center">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Dịch Vụ</option>
              <option value="massage-spa">Massage & Spa</option>
              <option value="wine-tasting-cellar">Wine Tasting Cellar</option>
              <option value="night-club">Night Club</option>
            </select>

            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="bg-[#141414] border border-white/10 rounded-lg px-3 py-2 text-xs text-[#ccc] focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">Tất Cả Thành Phố</option>
              <option value="ho-chi-minh-city">TP. Hồ Chí Minh</option>
              <option value="da-nang">Đà Nẵng & Hội An</option>
              <option value="vung-tau">Vũng Tàu</option>
              <option value="phu-quoc">Phú Quốc</option>
              <option value="nha-trang">Nha Trang</option>
            </select>

            <span className="text-xs text-[#777] ml-auto font-medium">
              Tổng số: {filteredVenues.length}
            </span>
          </div>
        </div>

        {/* CHUẨN HÓA BẢNG DANH SÁCH (STANDARDIZED UNIFORM TABLE) */}
        <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                  <th className="py-4 px-5 w-[28%]">Địa Điểm</th>
                  <th className="py-4 px-5 w-[18%]">Dịch Vụ</th>
                  <th className="py-4 px-5 w-[20%]">Thành Phố / Khu Vực</th>
                  <th className="py-4 px-5 w-[14%]">Giá Khởi Điểm</th>
                  <th className="py-4 px-5 w-[10%]">Bài Viết</th>
                  <th className="py-4 px-5 w-[10%] text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#ccc]">
                {filteredVenues.map((v) => (
                  <tr key={v.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Địa điểm */}
                    <td className="py-4 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10 bg-[#161616]"
                          style={{ backgroundImage: `url(${v.heroImage})` }}
                        />
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-white block truncate">
                            {v.name}
                          </span>
                          <span className="text-xs text-[#777] block mt-0.5 truncate">
                            {v.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dịch vụ */}
                    <td className="py-4 px-5 align-middle">
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold-light)] text-xs font-medium">
                        {getServiceLabel(v.serviceSlug)}
                      </span>
                    </td>

                    {/* Thành phố */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-xs font-medium text-white flex items-center gap-1.5">
                        <MapPin size={13} className="text-[var(--gold)] shrink-0" />
                        <span>{getCityLabel(v.destinationSlug)}</span>
                      </div>
                      <span className="text-xs text-[#777] block mt-0.5 ml-4 truncate">
                        {v.neighborhood || v.address}
                      </span>
                    </td>

                    {/* Giá khởi điểm */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-sm font-semibold text-[var(--gold-light)]">
                        ${v.priceFromUsd} USD
                      </div>
                      <span className="text-xs text-[#777] block mt-0.5">
                        {v.packages.length} gói giá
                      </span>
                    </td>

                    {/* Trạng thái bài viết */}
                    <td className="py-4 px-5 align-middle">
                      {v.promoTitle ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                          <Check size={12} />
                          <span>Đã có</span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#666]">Chưa có</span>
                      )}
                    </td>

                    {/* Thao tác */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(v)}
                          className="h-8 px-3 bg-white/5 hover:bg-[var(--gold)] hover:text-black text-white rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                        >
                          <Edit size={12} />
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteVenue(v.id, v.name)}
                          className="h-8 w-8 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg transition-colors inline-flex items-center justify-center"
                          title="Xóa địa điểm"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Soạn Thảo */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0e0e0e] border border-[var(--gold)]/40 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[var(--gold-light)] font-semibold">
                    {editingVenueId ? 'Cập Nhật Địa Điểm' : 'Tạo Địa Điểm Mới'}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif text-white mt-1">
                    {editingVenueId ? formData.name : 'Thêm Địa Điểm & Bài Viết Quảng Cáo'}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#888] hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveVenue} className="space-y-6">
                {/* Section 1 */}
                <div className="space-y-4">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gold-light)] border-b border-white/5 pb-1 flex items-center gap-2">
                    <Building2 size={14} />
                    <span>1. Thông Tin Cơ Bản & Phân Loại</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Tên Địa Điểm *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="VD: The Obsidian Penthouse Sanctuary"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Mã Định Danh (Slug)
                      </label>
                      <input
                        type="text"
                        placeholder="VD: obsidian-penthouse-sanctuary"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Dịch Vụ Phụ Trách *
                      </label>
                      <select
                        value={formData.serviceSlug}
                        onChange={(e) => setFormData({ ...formData, serviceSlug: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      >
                        <option value="massage-spa">Massage & Spa</option>
                        <option value="wine-tasting-cellar">Wine Tasting Cellar</option>
                        <option value="night-club">Night Club</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Vị Trí / Thành Phố *
                      </label>
                      <select
                        value={formData.destinationSlug}
                        onChange={(e) => setFormData({ ...formData, destinationSlug: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      >
                        <option value="ho-chi-minh-city">TP. Hồ Chí Minh</option>
                        <option value="da-nang">Đà Nẵng & Hội An</option>
                        <option value="vung-tau">Vũng Tàu</option>
                        <option value="phu-quoc">Đảo Phú Quốc</option>
                        <option value="nha-trang">Nha Trang & Cam Ranh</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Địa Chỉ & Khu Vực Chi Tiết
                      </label>
                      <input
                        type="text"
                        placeholder="VD: Tầng 38, Tòa Tháp Skyline, Quận 1, Sài Gòn"
                        value={formData.neighborhood}
                        onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value, address: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-[#aaa] mb-1 font-medium">
                        Giờ Mở Cửa & Sức Chứa
                      </label>
                      <input
                        type="text"
                        placeholder="VD: 10:00 - 23:30 (Max 8 khách)"
                        value={formData.openingHours}
                        onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                        className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Đường Dẫn Ảnh Bìa (Hero Image URL)
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.heroImage}
                      onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                {/* Section 2: Promo Story */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gold-light)] border-b border-white/5 pb-1 flex items-center gap-2">
                    <FileText size={14} />
                    <span>2. Bài Viết Quảng Cáo & Giới Thiệu Địa Điểm</span>
                  </h3>

                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Tiêu Đề Bài Viết Quảng Cáo *
                    </label>
                    <input
                      type="text"
                      placeholder="VD: Đỉnh Cao Thư Giãn Giữa Tầng Mây Tại Penthouse Skyline"
                      value={formData.promoTitle || ''}
                      onChange={(e) => setFormData({ ...formData, promoTitle: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Lời Dẫn Ngắn (Sapo)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Tóm tắt 1-2 câu tôn vinh vẻ đẹp, sự xa hoa và kín đáo của địa điểm..."
                      value={formData.promoExcerpt || ''}
                      onChange={(e) => setFormData({ ...formData, promoExcerpt: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Nội Dung Bài Viết Chi Tiết
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Viết chi tiết câu chuyện về không gian, chất lượng phục vụ, ẩm thực hảo hạng..."
                      value={formData.promoStory || ''}
                      onChange={(e) => setFormData({ ...formData, promoStory: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--gold)]"
                    />
                  </div>
                </div>

                {/* Section 3: Packages */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs uppercase tracking-wider font-semibold text-[var(--gold-light)] flex items-center gap-2">
                      <DollarSign size={14} />
                      <span>3. Các Gói Dịch Vụ & Bảng Giá ({formData.packages.length} gói)</span>
                    </h3>
                    <button
                      type="button"
                      onClick={handleAddPackage}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-semibold hover:bg-emerald-500 hover:text-black transition-colors"
                    >
                      <Plus size={13} />
                      <span>Thêm Gói Mới</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.packages.map((pkg, idx) => (
                      <div
                        key={pkg.id}
                        className="p-4 rounded-xl bg-[#141414] border border-white/10 space-y-3"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <span className="text-xs text-[var(--gold-light)] font-semibold">
                            Gói #{idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemovePackage(pkg.id)}
                            className="text-rose-400 hover:text-rose-300 text-xs flex items-center gap-1"
                          >
                            <Trash2 size={12} />
                            <span>Xóa</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                          <div className="sm:col-span-2">
                            <label className="block text-[0.7rem] text-[#888] mb-1">
                              Tên Gói Trải Nghiệm *
                            </label>
                            <input
                              type="text"
                              value={pkg.name}
                              onChange={(e) => handleUpdatePackage(pkg.id, 'name', e.target.value)}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-xs text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[0.7rem] text-[#888] mb-1">
                              Giá Tiền (USD) *
                            </label>
                            <input
                              type="number"
                              value={pkg.priceUsd}
                              onChange={(e) => handleUpdatePackage(pkg.id, 'priceUsd', Number(e.target.value))}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-xs text-[var(--gold-light)] font-semibold"
                            />
                          </div>

                          <div>
                            <label className="block text-[0.7rem] text-[#888] mb-1">
                              Thời Lượng (Phút)
                            </label>
                            <input
                              type="number"
                              value={pkg.durationMins}
                              onChange={(e) => handleUpdatePackage(pkg.id, 'durationMins', Number(e.target.value))}
                              className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-xs text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[0.7rem] text-[#888] mb-1">
                            Quyền Lợi Đi Kèm (Phân tách bằng dấu phẩy)
                          </label>
                          <input
                            type="text"
                            placeholder="VD: Phòng riêng, Rượu vang chào mừng, Thủy liệu pháp"
                            value={pkg.inclusions.join(', ')}
                            onChange={(e) =>
                              handleUpdatePackage(
                                pkg.id,
                                'inclusions',
                                e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                              )
                            }
                            className="w-full bg-[#1a1a1a] border border-white/10 rounded p-2 text-xs text-[#bbb]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#888] hover:text-white transition-colors"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity"
                  >
                    Lưu Địa Điểm & Bài Viết
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
