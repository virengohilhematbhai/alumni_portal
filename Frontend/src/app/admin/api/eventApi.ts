import { API_BASE, getAuthHeaders } from './config';
import { EventItem } from './types';

/**
 * Fetch Events List
 */
export async function getEvents(token: string): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch events');
  }
  return res.json();
}

/**
 * Create or Update Event
 */
export async function saveEvent(
  token: string,
  eventForm: Partial<EventItem>,
  eventId?: string | null
): Promise<EventItem> {
  const url = eventId ? `${API_BASE}/events/${eventId}` : `${API_BASE}/events`;
  const method = eventId ? 'PUT' : 'POST';

  const res = await fetch(url, {
    method,
    headers: getAuthHeaders(token),
    body: JSON.stringify(eventForm),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to save event');
  }
  return res.json();
}

/**
 * Delete Event
 */
export async function deleteEvent(token: string, id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/events/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete event');
  }
  return res.json();
}
