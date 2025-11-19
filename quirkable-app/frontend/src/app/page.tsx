import Link from 'next/link';

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-quirkable-charcoal mb-6">
            Turn Ideas Into Objects
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            3D printing made simple. From ready-made models to bespoke creations, we bring your
            vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/models"
              className="bg-quirkable-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Browse Models
            </Link>
            <Link
              href="/services"
              className="border-2 border-quirkable-blue text-quirkable-blue px-8 py-4 rounded-lg font-semibold hover:bg-quirkable-blue hover:text-white transition"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-display font-bold text-center mb-12">
          Four Ways We Bring Your Ideas to Life
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard
            title="Ready-Made Models"
            description="Browse our curated collection of print-ready 3D models"
            icon="🎨"
            href="/models"
          />
          <ServiceCard
            title="Bespoke Printing"
            description="Upload your file and we'll print it to perfection"
            icon="🖨️"
            href="/bespoke"
          />
          <ServiceCard
            title="File Repair"
            description="Broken STL? We'll fix it and get you printing"
            icon="🔧"
            href="/repair"
          />
          <ServiceCard
            title="Design Service"
            description="From concept to creation, our designers bring your vision to life"
            icon="✏️"
            href="/design"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-quirkable-charcoal text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            Why Choose Quirkable?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Expert Quality"
              description="Professional-grade 3D printing with meticulous attention to detail"
            />
            <FeatureCard
              title="Fast Turnaround"
              description="Most orders ready within 3-5 working days"
            />
            <FeatureCard
              title="UK-Based Support"
              description="Friendly, knowledgeable team ready to help with your project"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-display font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Whether you need a single print or a complete design solution, we're here to help.
        </p>
        <Link
          href="/register"
          className="inline-block bg-quirkable-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Create Account
        </Link>
      </section>
    </main>
  );
}

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
}

function ServiceCard({ title, description, icon, href }: ServiceCardProps): JSX.Element {
  return (
    <Link
      href={href}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border-2 border-transparent hover:border-quirkable-blue"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps): JSX.Element {
  return (
    <div className="text-center">
      <h3 className="text-2xl font-display font-bold mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
