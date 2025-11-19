import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('Header', () => {
  it('renders the logo', () => {
    render(<Header />);
    expect(screen.getByText('Quirkable')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /models/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
  });

  it('renders auth links', () => {
    render(<Header />);

    expect(screen.getByTestId('login-link')).toBeInTheDocument();
    expect(screen.getByTestId('register-link')).toBeInTheDocument();
  });

  it('has correct href attributes', () => {
    render(<Header />);

    expect(screen.getByRole('link', { name: /models/i })).toHaveAttribute('href', '/models');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByTestId('login-link')).toHaveAttribute('href', '/login');
  });
});
