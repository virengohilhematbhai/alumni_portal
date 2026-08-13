const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/auth`
  : 'http://localhost:5000/api/auth';

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  isAdmin: boolean;
  profilePhoto: string;
  phone: string;
  college: string;
  studentId: string;
  department: string;
  course: string;
  batchYear: string;
  graduationYear: string;
  bio: string;
}

export type UpdateProfilePayload = Partial<Omit<UserProfile, '_id' | 'email' | 'role' | 'isAdmin'>>;

export interface ApiError extends Error {
  status?: number;
}

/**
 * Fetch current user profile details using bearer token
 */
export async function getProfile(token: string): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const err: ApiError = new Error(errorData.message || 'Failed to load profile data');
    err.status = res.status;
    throw err;
  }

  return res.json();
}

/**
 * Update user profile details in MongoDB database
 */
export async function updateProfile(token: string, payload: UpdateProfilePayload): Promise<UserProfile> {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const updatedUser = await res.json();
  if (!res.ok) {
    throw new Error(updatedUser.message || 'Failed to update profile');
  }

  return updatedUser;
}
