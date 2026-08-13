import type { Metadata } from 'next';
import './globals.css';
import { LayoutWrapper } from '../components/LayoutWrapper';
// import { PageLoader } from '../components/ui/PageLoader';

export const metadata: Metadata = {
  title: 'Alumni Portal | Redefining Alumni Community & Excellence',
  description: 'A modern Alumni Portal built for graduates, students, and administrators. Connect, mentor, discover career opportunities, and attend global events.',
  keywords: ['Alumni Portal', 'Networking', 'Careers', 'Mentorship', 'Events', 'Reunions'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col selection:bg-red-600 selection:text-white">
        {/* <PageLoader /> */}
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
