import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Coaching Feed — Live Updates',
  description: 'A real-time coaching activity feed delivering live updates and insights from your coaches.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
