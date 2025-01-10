import { fireEvent, render, screen } from '@testing-library/react';
import ThemeToggle from './ThemeToggle';
import { ThemeProvider } from 'src/context/ThemeProvider/ThemeProvider';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';
import { HTMLMotionProps } from 'framer-motion';

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

// Mock icon
jest.mock('../Icon/Icon', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={`icon-${name}`} />,
}));

// Mock framer
jest.mock('framer-motion', () => ({
  motion: {
    button: ({
      children,
      ...props
    }: PropsWithChildren<HTMLMotionProps<'button'>>) => {
      const { ...htmlProps } = props;

      return (
        <button
          {...(htmlProps as DetailedHTMLProps<
            ButtonHTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
          >)}
        >
          {children}
        </button>
      );
    },
    span: ({
      children,
      ...props
    }: PropsWithChildren<HTMLMotionProps<'span'>>) => {
      const { ...htmlProps } = props;

      return (
        <span
          {...(htmlProps as DetailedHTMLProps<
            HTMLAttributes<HTMLSpanElement>,
            HTMLSpanElement
          >)}
        >
          {children}
        </span>
      );
    },
  },
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    // Clear localStorage and DOM classes before each test
    localStorage.clear();
    document.documentElement.classList.remove('light', 'dark');
    
    // Default to light theme preference
    mockMatchMedia(false);
  });

  it('shows sun icon when in dark mode', () => {
    // Set dark theme preference
    localStorage.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId('icon-theme_sun')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-theme_moon')).not.toBeInTheDocument();
  });


 it('toggles theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Should start with moon icon (light theme)
    expect(screen.getByTestId('icon-theme_moon')).toBeInTheDocument();

    // Click the toggle
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    // Should now show sun icon (dark theme)
    expect(screen.getByTestId('icon-theme_sun')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-theme_moon')).not.toBeInTheDocument();
  });

  it('respects system dark mode preference', () => {
    // Mock system dark mode preference
    mockMatchMedia(true);
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Should show sun icon for dark mode
    expect(screen.getByTestId('icon-theme_sun')).toBeInTheDocument();
    expect(screen.queryByTestId('icon-theme_moon')).not.toBeInTheDocument();
  });

  it('persists theme preference to localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Click the toggle to switch to dark mode
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    // Check localStorage
    expect(localStorage.getItem('theme')).toBe('dark');

    // Click again to switch back to light mode
    fireEvent.click(toggle);
    expect(localStorage.getItem('theme')).toBe('light');
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
