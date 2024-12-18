import React from 'react';

interface MobileContainerProps {
  children: React.ReactNode;
}

export function MobileContainer({ children }: MobileContainerProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto h-screen bg-white shadow-lg flex flex-col">
        {children}
      </div>
    </div>
  );
}