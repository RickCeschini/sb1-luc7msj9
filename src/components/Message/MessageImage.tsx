import React from 'react';

interface MessageImageProps {
  image: string;
}

export function MessageImage({ image }: MessageImageProps) {
  return (
    <img
      src={image}
      alt="Exam"
      className="max-w-full rounded-lg mb-2"
    />
  );
}