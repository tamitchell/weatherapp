import { motion } from "framer-motion";

export default function({ text }: { text: string }) {
    const words = text.split(' ');
  
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
             delay: index * 0.06,
             ease: "easeInOut"
           }}
         >
           {word}
         </motion.span>
        ))}
      </span>
    );
  };