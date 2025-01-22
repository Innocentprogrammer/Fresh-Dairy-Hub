import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">&copy; 2023 Fresh Dairy Hub. All rights reserved.</p>
          <div>
            <Link href="/privacy" className="text-gray-600 hover:text-blue-600 px-3 py-2">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-600 hover:text-blue-600 px-3 py-2">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

