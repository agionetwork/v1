import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'AGIO Network',
  description: 'Decentralized Lending Protocol',
  keywords: ['DeFi', 'Lending', 'Solana', 'P2P', 'Crypto'],
  authors: [{ name: 'AGIO Network Team' }],
  creator: 'AGIO Network',
  publisher: 'AGIO Network',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://agionetwork.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://agionetwork.com',
    title: 'AGIO Network',
    description: 'Decentralized Lending Protocol',
    siteName: 'AGIO Network',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AGIO Network',
    description: 'Decentralized Lending Protocol',
    creator: '@agionetwork',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} 