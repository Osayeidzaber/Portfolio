import './globals.css';
import { Metadata } from 'next';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  metadataBase: new URL('https://osayeed.netlify.app'),
  title: 'Osayeed Jaber | Full Stack Developer',
  description: 'Full Stack Developer passionate about creating clean, efficient, and user-friendly web applications.',
  keywords: ['Full Stack Developer', 'Web Development', 'React', 'Next.js', 'TypeScript'],
  authors: [{ name: 'Osayeed Jaber' }],
  openGraph: {
    title: 'Osayeed Jaber | Full Stack Developer',
    description: 'Full Stack Developer passionate about creating clean, efficient, and user-friendly web applications.',
    url: 'osayeedjaber.netlify.app',
    siteName: 'Osayeed Jaber Portfolio',
    images: [
      {
        url: 'https://osayeed.netlify.app/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-black min-h-screen text-white antialiased">
        <ErrorBoundary>
          <div className="fixed inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black -z-10" />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
} 