import { motion } from 'framer-motion';

export default function WordReveal({ text }: { text: string }) {
    const words = text.split(' ').filter(word => word.length > 0);
  
    if (words.length === 0) {
      return null;
    }
    
    return (
      <span className="inline">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.15,
              ease: "easeOut"
            }}
            data-testid={`word-${index}`}
          >
            {word}
          </motion.span>
        ))}
      </span>
    );
}
