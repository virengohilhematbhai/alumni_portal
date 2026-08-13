import { getAuthHeader, FACULTY_API_BASE, API_BASE } from '../../admin/api/config';
import { EventItem } from '../../admin/api/types';

export const getFacultyEvents = async (): Promise<EventItem[]> => {
  try {
    const res = await fetch(`${FACULTY_API_BASE}/events`, {
      headers: getAuthHeader(),
    });
    if (res.ok) {
      return await res.json();
    }
    // Fallback to public events API if faculty endpoint is unauthorized or empty
    const publicRes = await fetch(`${API_BASE}/events`, {
      headers: getAuthHeader(),
    });
    if (publicRes.ok) {
      return await publicRes.json();
    }
    return [];
  } catch (err) {
    console.error('Error fetching faculty events:', err);
    return [];
  }
};

export const saveFacultyEvent = async (data: Partial<EventItem>, id?: string): Promise<EventItem> => {
  const url = id ? `${FACULTY_API_BASE}/events/${id}` : `${FACULTY_API_BASE}/events`;
  const method = id ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to save event');
  }
  return res.json();
};

export const deleteFacultyEvent = async (id: string): Promise<void> => {
  const res = await fetch(`${FACULTY_API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to delete event');
  }
};
