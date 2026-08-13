export const API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/admin`
  : 'http://localhost:5000/api/admin';

export const FACULTY_API_BASE = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/faculty`
  : 'http://localhost:5000/api/faculty';

export const getAuthHeaders = (token?: string) => {
  const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('token') : '');
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken || ''}`,
  };
};

export const getAuthHeader = getAuthHeaders;
