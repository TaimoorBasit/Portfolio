import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers';

interface QuickRepliesProps {
  onReply: (reply: string) => void;
  className?: string;
}

const quickReplies = [
  'What websites do you build?',
  'How much does it cost?',
  'What technologies?',
  'Contact info',
  'End Chat'
];

export const QuickReplies: React.FC<QuickRepliesProps> = ({ 
  onReply, 
  className 
}) => {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {quickReplies.map((reply, index) => (
        <motion.button
          key={reply}
          onClick={() => onReply(reply)}
          className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {reply}
        </motion.button>
      ))}
    </div>
  );
};
