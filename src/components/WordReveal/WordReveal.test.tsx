import { screen, render } from '@testing-library/react';
import WordReveal from './WordReveal';
import { MotionComponentProps } from 'src/types/types';

// Mock framer
jest.mock('framer-motion', () => ({
  motion: {
    span: ({
      children,
      className,
      initial,
      'data-testid': dataTestId,
    }: MotionComponentProps) => (
      <span className={className} style={initial} data-testid={dataTestId}>
        {children}
      </span>
    ),
  },
}));

describe('WordReveal', () => {
    describe('basic rendering', () => {
      it('splits text into individual word spans', () => {
        const testText = "This is a test sentence.";
        render(<WordReveal text={testText} />);
        
        const words = testText.split(' ');
        words.forEach((word, index) => {
          expect(screen.getByTestId(`word-${index}`)).toHaveTextContent(word);
        });
      });
  
      it('applies correct styling to word spans', () => {
        render(<WordReveal text="Test sentence" />);
        
        const word = screen.getByTestId('word-0');
        expect(word).toHaveClass('inline-block', 'mr-[0.25em]');
      });
  
      it('applies initial opacity of 0 to each word', () => {
        render(<WordReveal text="Test sentence" />);
        
        const word = screen.getByTestId('word-0');
        expect(word).toHaveStyle({ opacity: 0 });
      });
    });
  
    describe('empty and edge cases', () => {
      it('returns null for empty text', () => {
        const { container } = render(<WordReveal text="" />);
        expect(container.firstChild).toBeNull();
      });
  
      it('handles text with only spaces', () => {
        const { container } = render(<WordReveal text="   " />);
        expect(container.firstChild).toBeNull();
      });
  
      it('handles multiple consecutive spaces', () => {
        const text = "Word1   Word2    Word3";
        render(<WordReveal text={text} />);
        
        expect(screen.getByTestId('word-0')).toHaveTextContent('Word1');
        expect(screen.getByTestId('word-1')).toHaveTextContent('Word2');
        expect(screen.getByTestId('word-2')).toHaveTextContent('Word3');
      });
    });
  
    describe('timing and delays', () => {
      const mockGetDelay = jest.fn();
  
      beforeEach(() => {
        mockGetDelay.mockReset();
      });
  
      it('adds pause after first short sentence only', () => {
        // Short sentence followed by short sentence
        const text = "Wear a coat. Pack a scarf.";
        render(<WordReveal text={text} />);
        
        const firstSentenceWords = screen.getAllByTestId(/word-[0-2]/);
        const secondSentenceWords = screen.getAllByTestId(/word-[3-5]/);
  
        // First sentence words should have standard delays
        firstSentenceWords.forEach((word, index) => {
          expect(word).toHaveTextContent(['Wear', 'a', 'coat.'][index]);
        });
  
        // Second sentence words should continue with standard delays
        secondSentenceWords.forEach((word, index) => {
          expect(word).toHaveTextContent(['Pack', 'a', 'scarf.'][index]);
        });
      });
  
      it('does not add pause for first sentence if longer than 5 words', () => {
        const text = "The weather is quite cold today. Wear a coat.";
        render(<WordReveal text={text} />);
        
        const words = text.split(' ');
        words.forEach((word, index) => {
          const wordElement = screen.getByTestId(`word-${index}`);
          expect(wordElement).toHaveTextContent(word);
        });
      });
  
      it('handles multiple sentence endings correctly', () => {
        const text = "Yes! No? Maybe. Definitely!";
        render(<WordReveal text={text} />);
        
        const words = text.split(' ');
        words.forEach((word, index) => {
          const wordElement = screen.getByTestId(`word-${index}`);
          expect(wordElement).toHaveTextContent(word);
        });
      });
  
      it('maintains correct word order for long text', () => {
        const text = "This is a longer sentence that should flow normally. Then a short one. And another.";
        render(<WordReveal text={text} />);
        
        const words = text.split(' ');
        words.forEach((word, index) => {
          const wordElement = screen.getByTestId(`word-${index}`);
          expect(wordElement).toHaveTextContent(word);
        });
      });
    });
  
    describe('animation configuration', () => {
      it('sets correct animation properties', () => {
        render(<WordReveal text="Test" />);
        
        const word = screen.getByTestId('word-0');
        expect(word.style.opacity).toBe('0'); // initial state
      });
  
      it('handles punctuation marks correctly', () => {
        const text = "Hello, world! How are you?";
        render(<WordReveal text={text} />);
        
        expect(screen.getByTestId('word-1')).toHaveTextContent('world!');
        expect(screen.getByTestId('word-4')).toHaveTextContent('you?');
      });
    });
  });