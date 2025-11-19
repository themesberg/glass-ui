import Link from 'next/link';

export default function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-quirkable-charcoal text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Quirkable</h3>
            <p className="text-gray-400">Turn Ideas Into Objects</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/models" className="text-gray-400 hover:text-white transition">
                  Ready-Made Models
                </Link>
              </li>
              <li>
                <Link href="/bespoke" className="text-gray-400 hover:text-white transition">
                  Bespoke Printing
                </Link>
              </li>
              <li>
                <Link href="/repair" className="text-gray-400 hover:text-white transition">
                  File Repair
                </Link>
              </li>
              <li>
                <Link href="/design" className="text-gray-400 hover:text-white transition">
                  Design Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Quirkable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
