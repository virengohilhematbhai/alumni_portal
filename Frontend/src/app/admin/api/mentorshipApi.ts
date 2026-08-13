import { API_BASE } from './config';
import { MentorshipItem } from './types';

/**
 * Fetch Mentorship Programs
 */
export async function getMentorships(token: string): Promise<MentorshipItem[]> {
  const res = await fetch(`${API_BASE}/mentorships`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch mentorships');
  }
  return res.json();
}
