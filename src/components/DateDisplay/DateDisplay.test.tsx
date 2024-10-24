import { render, screen } from '@testing-library/react';
import DateDisplay from './DateDisplay';

// Mock dayjs to return a fixed date
jest.mock('dayjs', () => () => ({
  format: jest.fn(() => 'October 17, 2024'), // Mock specific date format here
}));

describe('DateDisplay', () => {
  it('renders the correct formatted date', () => {
    render(<DateDisplay />);

    // Using data-testid to find the element
    const dateElement = screen.getByTestId('date-display');

    // Check that the correct text is rendered
    expect(dateElement).toHaveTextContent('Today is October 17, 2024');
  });
});
