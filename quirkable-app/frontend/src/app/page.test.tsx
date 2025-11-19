import { render, screen } from '@testing-library/react';

import HomePage from './page';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);

    const heading = screen.getByRole('heading', { name: /turn ideas into objects/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders all service cards', () => {
    render(<HomePage />);

    expect(screen.getByText('Ready-Made Models')).toBeInTheDocument();
    expect(screen.getByText('Bespoke Printing')).toBeInTheDocument();
    expect(screen.getByText('File Repair')).toBeInTheDocument();
    expect(screen.getByText('Design Service')).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<HomePage />);

    expect(screen.getByRole('link', { name: /browse models/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /our services/i })).toBeInTheDocument();
  });

  it('renders feature cards', () => {
    render(<HomePage />);

    expect(screen.getByText('Expert Quality')).toBeInTheDocument();
    expect(screen.getByText('Fast Turnaround')).toBeInTheDocument();
    expect(screen.getByText('UK-Based Support')).toBeInTheDocument();
  });

  it('has correct links to services', () => {
    render(<HomePage />);

    const modelsLink = screen.getAllByRole('link', { name: /browse models/i })[0];
    expect(modelsLink).toHaveAttribute('href', '/models');

    const servicesLink = screen.getByRole('link', { name: /our services/i });
    expect(servicesLink).toHaveAttribute('href', '/services');
  });
});
