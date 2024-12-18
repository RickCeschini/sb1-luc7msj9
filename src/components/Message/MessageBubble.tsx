import React from 'react';
import type { Message } from '../../types/message';
import { MessageImage } from './MessageImage';
import { MessageText } from './MessageText';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  return (
    <div className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.isBot
            ? 'bg-white'
            : 'bg-emerald-100 text-emerald-900'
        }`}
      >
        {message.image && <MessageImage image={message.image} />}
        <MessageText text={message.text} />
      </div>
    </div>
  );
}