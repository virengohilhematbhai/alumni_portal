import { getAuthHeader, FACULTY_API_BASE } from '../../admin/api/config';

export interface FacultyMember {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  accessLevel: string;
  status: 'Active' | 'Blocked' | 'Inactive';
  joinedDate: string;
  phone: string;
  avatar: string;
  password?: string;
}

export const getFacultyMembers = async (): Promise<FacultyMember[]> => {
  try {
    const res = await fetch(`${FACULTY_API_BASE}/members`, {
      headers: getAuthHeader(),
    });
    if (res.ok) {
      return await res.json();
    }
    return [];
  } catch (err) {
    console.error('Error fetching faculty list:', err);
    return [];
  }
};

export const createFacultyMember = async (data: Partial<FacultyMember>): Promise<FacultyMember> => {
  const res = await fetch(`${FACULTY_API_BASE}/members`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to create faculty member');
  }
  return res.json();
};

export const updateFacultyMember = async (id: string, data: Partial<FacultyMember>): Promise<FacultyMember> => {
  const res = await fetch(`${FACULTY_API_BASE}/members/${id}`, {
    method: 'PUT',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to update faculty member');
  }
  return res.json();
};

export const deleteFacultyMember = async (id: string): Promise<void> => {
  const res = await fetch(`${FACULTY_API_BASE}/members/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to delete faculty member');
  }
};
