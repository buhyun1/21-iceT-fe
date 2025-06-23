import { useState } from 'react';

const useAlgorithmDropdown = (initialTypes: string[] = []) => {
  const [selectedAlgorithmTypes, setSelectedAlgorithmTypes] = useState<string[]>(initialTypes);

  // 알고리즘 유형 모두 선택 해제
  const handleClearAllTypes = () => {
    setSelectedAlgorithmTypes([]);
  };

  // 알고리즘 유형 선택/해제
  const handleToggleAlgorithmType = (type: string) => {
    setSelectedAlgorithmTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  return { selectedAlgorithmTypes, handleToggleAlgorithmType, handleClearAllTypes };
};

export default useAlgorithmDropdown;
