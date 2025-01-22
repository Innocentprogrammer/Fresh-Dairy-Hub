import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Footer from './components/Footer'
import Map from './components/Map'
import { AppProvider } from './context/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Fresh Dairy Hub',
  description: 'Your one-stop shop for fresh dairy products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Map/>
          <Footer />
        </AppProvider>
      </body>
    </html>
  )
}

