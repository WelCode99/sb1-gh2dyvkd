import React from 'react';
import { cn } from '../lib/utils';

interface ChatMessageProps {
  content: string;
  isBot?: boolean;
  timestamp?: Date;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isBot = false,
  timestamp = new Date(),
}) => {
  return (
    <div
      className={cn(
        'flex w-full',
        isBot ? 'justify-start' : 'justify-end'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-4',
          isBot ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
        )}
      >
        <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        <div className={cn(
          'text-xs mt-2',
          isBot ? 'text-secondary-foreground/70' : 'text-primary-foreground/70'
        )}>
          {timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};