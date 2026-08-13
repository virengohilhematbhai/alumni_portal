export interface AdminStats {
  totalStudents: number;
  approvedStudents: number;
  pendingApproval: number;
  blockedStudents: number;
  whitelistedEmailsCount: number;
  totalEvents: number;
}

export interface WhitelistEntry {
  _id: string;
  email: string;
  createdAt?: string;
}

export interface StudentUser {
  _id: string;
  fullName: string;
  name?: string;
  email: string;
  degree?: string;
  branch?: string;
  gradYear?: number;
  status: string;
  isBlocked?: boolean;
  role?: string;
  createdAt?: string;
}

export interface EventItem {
  _id: string;
  title: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
  attendeesCount?: number;
}

export type TabType = 'overview' | 'whitelist' | 'students' | 'events' | 'mentorships' | 'faculty' | 'gallery';

export interface MentorshipItem {
  _id: string;
  title: string;
  mentorName: string;
  mentorEmail?: string;
  category: string;
  status?: string;
  description?: string;
  createdAt?: string;
  studentName?: string;
  studentEmail?: string;
  topic?: string;
  message?: string;
  notes?: string;
  name?: string;
}
