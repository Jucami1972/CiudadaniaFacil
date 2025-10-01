// src/wrappers/HistoriaAmericanaWrapper.tsx

import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const HistoriaAmericanaWrapper: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    navigation.replace('StudyCards', {
      category: 'history',
      title: 'Historia Americana',
      subtitle: 'A: Período Colonial e Independencia',
      questionRange: '58-70',
    });
  }, [navigation]);

  return null;
};

export default HistoriaAmericanaWrapper;
