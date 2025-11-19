import Link from 'next/link';

export default function Header(): JSX.Element {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-display font-bold text-quirkable-blue">Quirkable</div>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/models" className="text-gray-700 hover:text-quirkable-blue transition">
              Models
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-quirkable-blue transition">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-quirkable-blue transition">
              About
            </Link>
            <Link
              href="/login"
              className="text-gray-700 hover:text-quirkable-blue transition"
              data-testid="login-link"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-quirkable-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              data-testid="register-link"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
