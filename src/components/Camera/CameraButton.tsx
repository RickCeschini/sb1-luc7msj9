import React from 'react';
import { Camera } from 'lucide-react';
import { CameraModal } from './CameraModal';

interface CameraButtonProps {
  onImageCapture: (image: string) => void;
}

export function CameraButton({ onImageCapture }: CameraButtonProps) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white hover:text-gray-200 transition-colors"
        title="Take exam photo"
      >
        <Camera className="w-6 h-6" />
      </button>

      <CameraModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCapture={onImageCapture}
      />
    </>
  );
}