import { getAuthHeader, FACULTY_API_BASE, API_BASE } from '../../admin/api/config';
import { MentorshipItem } from '../../admin/api/types';

export const getFacultyMentorships = async (): Promise<MentorshipItem[]> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  try {
    const res = await fetch(`${FACULTY_API_BASE}/mentorships`, {
      headers: getAuthHeader(token || undefined),
    });
    if (res.ok) {
      return await res.json();
    }
    const adminRes = await fetch(`${API_BASE}/mentorships`, {
      headers: getAuthHeader(token || undefined),
    });
    if (adminRes.ok) {
      return await adminRes.json();
    }
    const errorData = await adminRes.json().catch(() => ({}));
    console.error('Failed to fetch mentorship requests:', errorData.message || adminRes.statusText);
    return [];
  } catch (err) {
    console.error('Error in getFacultyMentorships:', err);
    return [];
  }
};

export const updateFacultyMentorshipStatus = async (
  id: string,
  status: string,
  notes?: string
): Promise<MentorshipItem> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${FACULTY_API_BASE}/mentorships/${id}/status`, {
    method: 'PATCH',
    headers: getAuthHeader(token || undefined),
    body: JSON.stringify({ status, notes }),
  });
  if (!res.ok) {
    const adminRes = await fetch(`${API_BASE}/mentorships/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeader(token || undefined),
      body: JSON.stringify({ status, notes }),
    });
    if (!adminRes.ok) {
      const errorData = await adminRes.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update mentorship status');
    }
    return adminRes.json();
  }
  return res.json();
};

export const deleteFacultyMentorship = async (id: string): Promise<void> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const res = await fetch(`${FACULTY_API_BASE}/mentorships/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(token || undefined),
  });
  if (!res.ok) {
    const adminRes = await fetch(`${API_BASE}/mentorships/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(token || undefined),
    });
    if (!adminRes.ok) {
      const errorData = await adminRes.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete mentorship record');
    }
  }
};
