import { screen, render } from '@testing-library/react';
import WordReveal from "./WordReveal";
import { MotionComponentProps } from 'src/types/types';

// Mock framer
jest.mock('framer-motion', () => ({
    motion: {
      span: ({ children, className, initial, 'data-testid': dataTestId }: MotionComponentProps) => (
        <span
          className={className}
          style={initial}
          data-testid={dataTestId}
        >
          {children}
        </span>
      ),
    },
  }));

  describe('WordReveal', () => {
    const testText = "This is a test sentence";
  
    it('splits text into individual word spans', () => {
      render(<WordReveal text={testText} />);
      
      const words = testText.split(' ');
      words.forEach((word, index) => {
        expect(screen.getByTestId(`word-${index}`)).toHaveTextContent(word);
      });
    });
  
    it('applies correct styling to word spans', () => {
      render(<WordReveal text={testText} />);
      
      const words = testText.split(' ');
      words.forEach((_, index) => {
        const wordElement = screen.getByTestId(`word-${index}`);
        expect(wordElement).toHaveClass('inline-block', 'mr-[0.25em]');
      });
    });
  
    it('applies initial opacity of 0 to each word', () => {
      render(<WordReveal text={testText} />);
      
      const words = testText.split(' ');
      words.forEach((_, index) => {
        const wordElement = screen.getByTestId(`word-${index}`);
        expect(wordElement).toHaveStyle({ opacity: 0 });
      });
    });
  
    it('maintains word order', () => {
      render(<WordReveal text={testText} />);
      
      const words = testText.split(' ');
      words.forEach((word, index) => {
        const wordElement = screen.getByTestId(`word-${index}`);
        expect(wordElement).toHaveTextContent(word);
      });
    });
  
    it('handles empty text', () => {
      const { container } = render(<WordReveal text="" />);
      expect(container.firstChild).toBeNull();
    });
  
    it('handles text with only spaces', () => {
      const { container } = render(<WordReveal text="   " />);
      expect(container.firstChild).toBeNull();
    });
  
    it('handles single word', () => {
      const singleWord = "Test";
      render(<WordReveal text={singleWord} />);
      
      const wordElement = screen.getByTestId('word-0');
      expect(wordElement).toHaveTextContent(singleWord);
      expect(wordElement).toHaveClass('inline-block', 'mr-[0.25em]');
    });
  
    it('handles text with multiple spaces', () => {
      const textWithSpaces = "This   has   extra   spaces";
      render(<WordReveal text={textWithSpaces} />);
      
      const words = textWithSpaces.split(' ').filter(word => word.length > 0);
      words.forEach((word, index) => {
        const wordElement = screen.getByTestId(`word-${index}`);
        expect(wordElement).toHaveTextContent(word);
      });
    });
  });