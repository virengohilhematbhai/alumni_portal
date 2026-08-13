import { API_BASE } from './config';
import { StudentUser } from './types';

/**
 * Fetch Students / Alumni Directory List
 */
export async function getStudents(
  token: string,
  searchQuery: string = '',
  statusFilter: string = 'all'
): Promise<StudentUser[]> {
  let url = `${API_BASE}/students?search=${encodeURIComponent(searchQuery)}`;
  if (statusFilter !== 'all') {
    url += `&status=${statusFilter}`;
  }

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch student directory');
  }
  return res.json();
}

/**
 * Toggle Block / Unblock Access for a Student User
 */
export async function toggleBlockStudent(
  token: string,
  id: string
): Promise<{ message: string; isBlocked: boolean }> {
  const res = await fetch(`${API_BASE}/block/${id}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to update student access block status');
  }
  return res.json();
}

/**
 * Permanently Delete Student User Account & Profile from MongoDB
 */
export async function deleteUserAccount(token: string, emailOrId: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/user/${encodeURIComponent(emailOrId)}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to delete user account');
  }
  return res.json();
}
