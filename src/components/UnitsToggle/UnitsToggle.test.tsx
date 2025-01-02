import { render, screen } from '@testing-library/react';
import UnitsToggle from './UnitsToggle';
import { HTMLAttributes } from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    //@ts-nocheck
    button: ({ children, ...props }: HTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
    //@ts-nocheck
    span: ({ children, ...props }: HTMLAttributes<HTMLSpanElement>) => (
      <span {...props}>{children}</span>
    ),
  },
}));

describe('UnitsToggle', () => {
  let onToggle: jest.Mock;

  beforeEach(() => {
    onToggle = jest.fn();
  });

  describe('rendering', () => {
    it('renders US unit system as active when imperial', () => {
      render(<UnitsToggle units={'imperial'} onToggle={onToggle} />);

      const usText = screen.getByText('US');
      const metricText = screen.getByText('Metric');

      //White(Active), Black(Inactive)
      expect(usText).toHaveClass('text-white');
      expect(metricText).toHaveClass('text-black');
    });
    it('renders Metric unit system as active when metric', () => {
      render(<UnitsToggle units={'metric'} onToggle={onToggle} />);

      const usText = screen.getByText('US');
      const metricText = screen.getByText('Metric');

      expect(usText).toHaveClass('text-black');
      expect(metricText).toHaveClass('text-white');
    });
  });

  describe('interactions', () => {
    it('calls onToggle when clicked', async () => {
      render(<UnitsToggle units="imperial" onToggle={onToggle} />);
      const toggle = screen.getByRole('button');

      toggle.click();

      expect(onToggle).toHaveBeenCalledTimes(1);
    });
  });
  //TBD
  //   describe('accessibility', () => {
  //     it('is keyboard accessible', () => {
  //         render(<UnitsToggle units="imperial" onToggle={onToggle} />);
  //         const toggle = screen.getByRole('button');

  //         // Check it can receive focus
  //         toggle.focus();
  //         expect(toggle).toHaveFocus();

  //         // Check it responds to keyboard
  //         toggle.focus();
  //         fireEvent.keyDown(toggle, { key: 'Enter' });
  //         expect(onToggle).toHaveBeenCalled();
  //       });

  //       it('has appropriate aria label', () => {
  //         render(<UnitsToggle units="imperial" onToggle={onToggle} />);
  //         expect(screen.getByRole('button', {
  //           name: /toggle temperature units/i
  //         })).toBeInTheDocument();
  //       });
  //   })
});
