import type { Metadata } from 'next';

const isDevelopment = process.env.NODE_ENV === 'development';
const baseUrl = isDevelopment ? 'http://localhost:3000' : 'https://osayeedjaber.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: 'Osayeed Jaber | Creative Developer',
  description: 'Creative developer and UI/UX designer portfolio showcasing web development, Discord bots, and design projects.',
  keywords: ['Osayeed Jaber', 'Web Developer', 'UI/UX Designer', 'Discord Developer', 'Portfolio'],
  authors: [{ name: 'Osayeed Jaber' }],
  openGraph: {
    title: 'Osayeed Jaber | Creative Developer',
    description: 'Creative developer and UI/UX designer portfolio',
    url: '/',
    siteName: 'Osayeed Jaber Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Add your OG image to public folder
        width: 1200,
        height: 630,
        alt: 'Osayeed Jaber Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Osayeed Jaber | Creative Developer',
    description: 'Creative developer and UI/UX designer portfolio',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}; 