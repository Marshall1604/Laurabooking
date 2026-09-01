export type UserRole = 'guest' | 'member' | 'vip' | 'editor' | 'admin' | 'super_admin';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  membershipTier: string;
  avatarUrl?: string;
  phone?: string;
  preferredLocale: string;
  memberSince: string;
}

export const DEMO_USERS: Record<string, AuthUser> = {
  vip: {
    id: 'user-vip-1',
    email: 'alex.morgan@private.org',
    fullName: 'Alexander Morgan',
    role: 'vip',
    membershipTier: 'The Privé Tier',
    phone: '+65 9123 4567',
    preferredLocale: 'en',
    memberSince: '2026',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  member: {
    id: 'user-mem-1',
    email: 'minjun.kim@venture.kr',
    fullName: 'Min-jun Kim',
    role: 'member',
    membershipTier: 'Single Access Pass',
    phone: '+82 10 5555 8888',
    preferredLocale: 'ko',
    memberSince: '2026',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  admin: {
    id: 'user-admin-1',
    email: 'admin@aurelis.vip',
    fullName: 'AURELIS Executive Admin',
    role: 'admin',
    membershipTier: 'Super Concierge Admin',
    phone: '+84 90 888 9999',
    preferredLocale: 'en',
    memberSince: '2025',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
};
