import React from 'react';

interface MessageTextProps {
  text: string;
}

export function MessageText({ text }: MessageTextProps) {
  return <div className="break-words">{text}</div>;
}