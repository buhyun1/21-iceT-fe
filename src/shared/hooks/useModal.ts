import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (value: boolean) => {
    setIsModalOpen(value);
  };

  return { isModalOpen, handleModalOpen };
};

export default useModal;
