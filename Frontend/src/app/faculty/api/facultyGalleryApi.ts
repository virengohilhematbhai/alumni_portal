import { getAuthHeader, FACULTY_API_BASE } from '../../admin/api/config';

export interface FacultyGalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  uploader: string;
  date: string;
  status: string;
}

export const getFacultyGalleryList = async (): Promise<FacultyGalleryItem[]> => {
  try {
    const res = await fetch(`${FACULTY_API_BASE}/gallery`, {
      headers: getAuthHeader(),
    }).catch(() => null);

    if (res && res.ok) {
      return await res.json().catch(() => []);
    }
    return [];
  } catch (err) {
    return [];
  }
};

export const createFacultyGalleryItem = async (data: Partial<FacultyGalleryItem>): Promise<FacultyGalleryItem> => {
  const res = await fetch(`${FACULTY_API_BASE}/gallery`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to upload image');
  }
  return res.json();
};

export const deleteFacultyGalleryItem = async (id: string): Promise<void> => {
  const res = await fetch(`${FACULTY_API_BASE}/gallery/${id}`, {
    method: 'DELETE',
    headers: getAuthHeader(),
  });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || 'Failed to delete gallery image');
  }
};
