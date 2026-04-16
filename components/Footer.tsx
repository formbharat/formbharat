import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 md:py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 md:gap-8 mb-8">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="text-white font-bold text-lg">FormBharat</span>
            </div>
            <p className="text-sm">
              The form builder made for Indian businesses. Simple, powerful, and free.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="/builder" className="hover:text-white transition">Form Builder</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4">Open Source</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/formbharat/formbharat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition flex items-center gap-1">GitHub ↗</a></li>
              <li><Link href="/open-source" className="hover:text-white transition">Documentation</Link></li>
              <li><Link href="/open-source#contribute" className="hover:text-white transition">Contribute</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resources" className="hover:text-white transition">All Guides</Link></li>
              <li><Link href="/resources/lead-generation" className="hover:text-white transition">Lead Generation</Link></li>
              <li><Link href="/resources/whatsapp-forms" className="hover:text-white transition">WhatsApp Forms</Link></li>
              <li><Link href="/resources/surveys-feedback" className="hover:text-white transition">Surveys & Feedback</Link></li>
              <li><Link href="/resources/form-design" className="hover:text-white transition">Form Design</Link></li>
              <li><Link href="/help" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3 md:mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 md:pt-8 text-center text-xs md:text-sm">
          <p>© 2024 FormBharat. Open Source & Made with ❤️ in India 🇮🇳</p>
          <p className="text-gray-500 mt-2">
            <a href="https://github.com/formbharat/formbharat" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              Star us on GitHub ⭐
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
