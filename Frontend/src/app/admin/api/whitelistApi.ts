import { API_BASE, getAuthHeaders } from './config';
import { WhitelistEntry } from './types';

/**
 * Fetch Approved College Email Whitelist
 */
export async function getWhitelist(token: string): Promise<WhitelistEntry[]> {
  const res = await fetch(`${API_BASE}/whitelist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch email whitelist');
  }
  return res.json();
}

/**
 * Add Single Email to Whitelist
 */
export async function addWhitelist(token: string, email: string): Promise<WhitelistEntry> {
  const res = await fetch(`${API_BASE}/whitelist`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add email to whitelist');
  }
  return res.json();
}

/**
 * Add Bulk Emails to Whitelist
 */
export async function addBulkWhitelist(token: string, emails: string[]): Promise<{ added: number; message: string }> {
  const res = await fetch(`${API_BASE}/whitelist/bulk`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ emails }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to add bulk emails');
  }
  return res.json();
}

/**
 * Remove Single Email from Whitelist
 */
export async function removeWhitelist(token: string, id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}/whitelist/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to remove whitelist email');
  }
  return res.json();
}

/**
 * Delete Bulk Whitelist Emails
 */
export async function deleteWhitelistBulk(token: string, ids: string[]): Promise<{ deleted: number; message: string }> {
  const res = await fetch(`${API_BASE}/whitelist/delete-bulk`, {
    method: 'POST',
    headers: getAuthHeaders(token),
    body: JSON.stringify({ ids }),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to bulk delete whitelist emails');
  }
  return res.json();
}
