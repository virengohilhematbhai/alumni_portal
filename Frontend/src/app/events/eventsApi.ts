const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/events`
  : 'http://localhost:5000/api/events';

export interface EventItem {
  _id?: string;
  id?: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
  attendeesCount?: number;
  attendees?: number;
}

/**
 * Fetch all public events from the backend server
 */
export async function getPublicEvents(): Promise<EventItem[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    throw new Error('Failed to fetch public events from server');
  }
  return res.json();
}

/**
 * Fetch a single public event by ID
 */
export async function getPublicEventById(id: string): Promise<EventItem> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch event details');
  }
  return res.json();
}
