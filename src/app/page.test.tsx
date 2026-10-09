import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Dashboard Home', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    
    // Check if the title is rendered
    const heading = screen.getByRole('heading', { name: /bem-vindo/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the revenue stats', () => {
    render(<Home />);
    
    // Check if the revenue stats are rendered
    const stat = screen.getByText(/faturamento do mês/i);
    expect(stat).toBeInTheDocument();
    
    const value = screen.getByText(/R\$ 2\.450,00/i);
    expect(value).toBeInTheDocument();
  });
});
