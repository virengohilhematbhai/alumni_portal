import { API_BASE } from './config';
import { AdminStats } from './types';

/**
 * Fetch Admin Dashboard Overview Statistics
 */
export async function getAdminStats(token: string): Promise<AdminStats> {
  const res = await fetch(`${API_BASE}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch admin statistics');
  }
  return res.json();
}
