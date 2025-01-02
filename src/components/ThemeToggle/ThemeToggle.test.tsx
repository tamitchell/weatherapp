import { render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from 'src/context/ThemeProvider/ThemeProvider';

// Mock icon
jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`} />
}));

// Mock framer
jest.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  }
}));

describe('ThemeToggle', () => {
  it('shows correct icon for current theme', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Default to light theme, should show moon icon
    expect(screen.getByTestId('icon-theme_moon')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-theme_sun')).not.toBeInTheDocument();
  });

  it('toggles theme when clicked', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    await button.click();
    
    // Should now show sun icon for dark theme
    expect(screen.getByTestId('icon-theme_sun')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-theme_moon')).not.toBeInTheDocument();
  });

  it('has correct aria-label', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark theme');
  });
});