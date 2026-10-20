import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WellQuest — Wellness, made personal',
  description: 'A supportive wellness space for coaches and participants to set goals, join challenges, and celebrate progress.',
  metadataBase: new URL('https://wellquest-personal-wellness.ardent-berry-8141.chatgpt.site'),
  openGraph: {
    title: 'WellQuest — Wellness, made personal',
    description: 'Set thoughtful goals, join supportive challenges, and celebrate progress together.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WellQuest — Wellness, made personal',
    description: 'Set thoughtful goals, join supportive challenges, and celebrate progress together.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
