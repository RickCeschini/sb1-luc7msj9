import { useState } from 'react';

export function useCamera() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCamera = () => setIsModalOpen(true);
  const closeCamera = () => setIsModalOpen(false);

  return {
    isModalOpen,
    openCamera,
    closeCamera,
  };
}