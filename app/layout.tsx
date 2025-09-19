import type { Metadata } from 'next'
import { Inter, Amiri } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const amiri = Amiri({ 
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-amiri',
})

export const metadata: Metadata = {
  title: 'Al Djaber Qamis - Boutique Musulmane Algérie',
  description: 'Boutique en ligne spécialisée dans les qamis et vêtements musulmans en Algérie',
  keywords: 'qamis, vêtements musulmans, algérie, boutique en ligne, islam',
  authors: [{ name: 'Al Djaber Qamis' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    shortcut: ['/favicon.ico']
  },
  openGraph: {
    title: 'Al Djaber Qamis - Boutique Musulmane Algérie',
    description: 'Boutique en ligne spécialisée dans les qamis et vêtements musulmans en Algérie',
    type: 'website',
    locale: 'fr_DZ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${amiri.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body className="font-sans bg-dark-950 text-white antialiased">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1f1f1f',
                  color: '#fff',
                  border: '1px solid #404040',
                },
              }}
            />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}





