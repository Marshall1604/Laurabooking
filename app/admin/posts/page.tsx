'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Building2,
  CalendarDays,
  MapPin,
  Layers,
  Users,
  Handshake,
  Settings,
  Sparkles,
  User,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import { INITIAL_POSTS, type PostRecord } from '@/lib/data-store';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostRecord[]>(INITIAL_POSTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<PostRecord>({
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
    serviceTag: 'massage-spa',
    destinationTag: 'ho-chi-minh-city',
    author: 'Ban Biên Tập LAURA',
    isPublished: true,
    publishedAt: new Date().toISOString().split('T')[0],
  });

  const handleOpenNew = () => {
    setEditingId(null);
    setFormData({
      id: `post-${Date.now()}`,
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80',
      serviceTag: 'massage-spa',
      destinationTag: 'ho-chi-minh-city',
      author: 'Ban Biên Tập LAURA',
      isPublished: true,
      publishedAt: new Date().toISOString().split('T')[0],
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post: PostRecord) => {
    setEditingId(post.id);
    setFormData(JSON.parse(JSON.stringify(post)));
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa bài viết này khỏi Tạp chí?')) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const finalData = { ...formData, slug };

    if (editingId) {
      setPosts(posts.map((p) => (p.id === editingId ? finalData : p)));
    } else {
      setPosts([finalData, ...posts]);
    }
    setIsModalOpen(false);
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
    if (slug === 'nha-trang') return 'Nha Trang';
    return slug;
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
              <BookOpen size={14} />
              <span>Biên Tập & Tạp Chí</span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-serif text-white font-normal">
              Quản Trị Bài Viết Tạp Chí
            </h1>
            <p className="text-xs sm:text-sm text-[#888] font-light mt-1">
              Soạn thảo, gắn thẻ phân loại dịch vụ và đăng tải các bài viết chuyên sâu.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenNew}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg shadow-lg hover:opacity-90 transition-opacity shrink-0"
          >
            <Plus size={15} />
            <span>Viết Bài Mới</span>
          </button>
        </div>

        {/* CHUẨN HÓA BẢNG DANH SÁCH BÀI VIẾT (STANDARDIZED UNIFORM TABLE) */}
        <div className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.03] text-[#888] uppercase tracking-wider text-[0.7rem] font-medium">
                  <th className="py-4 px-5 w-[38%]">Bài Viết</th>
                  <th className="py-4 px-5 w-[18%]">Gắn Thẻ Dịch Vụ</th>
                  <th className="py-4 px-5 w-[16%]">Thành Phố</th>
                  <th className="py-4 px-5 w-[18%]">Tác Giả & Ngày Đăng</th>
                  <th className="py-4 px-5 w-[10%] text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#ccc]">
                {posts.map((p) => (
                  <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Bài viết */}
                    <td className="py-4 px-5 align-middle">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10 bg-[#161616]"
                          style={{ backgroundImage: `url(${p.coverImage})` }}
                        />
                        <div className="min-w-0">
                          <span className="text-sm font-medium text-white block truncate">
                            {p.title}
                          </span>
                          <span className="text-xs text-[#777] block mt-0.5 truncate">
                            /{p.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dịch vụ */}
                    <td className="py-4 px-5 align-middle">
                      <span className="inline-block px-3 py-1 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 text-[var(--gold-light)] text-xs font-medium">
                        {getServiceLabel(p.serviceTag)}
                      </span>
                    </td>

                    {/* Thành phố */}
                    <td className="py-4 px-5 align-middle">
                      <span className="text-xs font-medium text-white">
                        {getCityLabel(p.destinationTag)}
                      </span>
                    </td>

                    {/* Tác giả & ngày */}
                    <td className="py-4 px-5 align-middle">
                      <div className="text-xs font-medium text-white">{p.author}</div>
                      <span className="text-xs text-[#777] block mt-0.5">{p.publishedAt}</span>
                    </td>

                    {/* Thao tác */}
                    <td className="py-4 px-5 align-middle text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(p)}
                          className="h-8 px-3 bg-white/5 hover:bg-[var(--gold)] hover:text-black text-white rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                        >
                          <Edit size={12} />
                          <span>Sửa</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(p.id)}
                          className="h-8 w-8 bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-400 rounded-lg transition-colors inline-flex items-center justify-center"
                          title="Xóa bài viết"
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
            <div className="bg-[#0e0e0e] border border-[var(--gold)]/40 rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h2 className="text-xl font-serif text-white">
                  {editingId ? 'Chỉnh Sửa Bài Viết' : 'Tạo Bài Viết Tạp Chí Mới'}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-[#888] hover:text-white rounded-lg hover:bg-white/5"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-xs text-[#aaa] mb-1 font-medium">
                    Tiêu Đề Bài Viết *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Dịch Vụ Liên Quan
                    </label>
                    <select
                      value={formData.serviceTag}
                      onChange={(e) => setFormData({ ...formData, serviceTag: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="massage-spa">Massage & Spa</option>
                      <option value="wine-tasting-cellar">Wine Tasting Cellar</option>
                      <option value="night-club">Night Club</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#aaa] mb-1 font-medium">
                      Thành Phố Liên Quan
                    </label>
                    <select
                      value={formData.destinationTag}
                      onChange={(e) => setFormData({ ...formData, destinationTag: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="ho-chi-minh-city">TP. Hồ Chí Minh</option>
                      <option value="da-nang">Đà Nẵng & Hội An</option>
                      <option value="vung-tau">Vũng Tàu</option>
                      <option value="phu-quoc">Phú Quốc</option>
                      <option value="nha-trang">Nha Trang</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#aaa] mb-1 font-medium">
                    Đường Dẫn Ảnh Bìa (Cover Image URL)
                  </label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#aaa] mb-1 font-medium">
                    Đoạn Tóm Tắt Ngắn (Sapo)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#aaa] mb-1 font-medium">
                    Nội Dung Bài Viết Chi Tiết
                  </label>
                  <textarea
                    rows={6}
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full bg-[#141414] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs text-[#888] hover:text-white"
                  >
                    Hủy Bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#090704] bg-gradient-to-r from-[#b79051] via-[#e3c98d] to-[#b68b4b] rounded-lg"
                  >
                    Lưu Bài Viết
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
