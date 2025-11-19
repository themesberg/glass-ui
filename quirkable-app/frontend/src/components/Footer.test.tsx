import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
  it('renders the company name', () => {
    render(<Footer />);
    expect(screen.getByText('Quirkable')).toBeInTheDocument();
  });

  it('renders all service links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /ready-made models/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bespoke printing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /file repair/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /design service/i })).toBeInTheDocument();
  });

  it('renders company links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /about us/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument();
  });

  it('renders legal links', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: /privacy policy/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /terms of service/i })).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });
});
