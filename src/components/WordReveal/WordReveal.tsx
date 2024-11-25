import { motion } from 'framer-motion';

export default function WordReveal({ text }: { text: string }) {
  const words = text.split(' ').filter((word) => word.length > 0);

  if (words.length === 0) {
    return null;
  }

  // Check if word ends a sentence
  const isEndOfSentence = (word: string): boolean => {
    return /[.!?]$/.test(word);
  };

  //We want to add a pause if the first sentence is short, almost like the generator is
  //taking a breath, for example "Rain is unlikely today (pause). [Rest of sentence]"

  const getFirstSentenceLength = (): number => {
    const firstSentenceEnd = words.findIndex(isEndOfSentence);
    return firstSentenceEnd === -1 ? words.length : firstSentenceEnd + 1;
  };

  const getDelay = (index: number): number => {
    const baseDelay = 0.078;
    const pauseDelay = 0.25;
    let totalDelay = index * baseDelay;

    const firstSentenceLength = getFirstSentenceLength();
    let foundFirstShortSentence = false;

    // Only add pauses up to current index
    for (let i = 0; i < index; i++) {
      if (isEndOfSentence(words[i])) {
        // Only add pause if this is the first sentence and it's short
        if (
          !foundFirstShortSentence &&
          i + 1 <= 5 &&
          i + 1 === firstSentenceLength
        ) {
          totalDelay += pauseDelay;
          foundFirstShortSentence = true;
        }
      }
    }

    return totalDelay;
  };

  return (
    <span className="inline">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            delay: getDelay(index),
            ease: 'easeOut',
          }}
          data-testid={`word-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}
