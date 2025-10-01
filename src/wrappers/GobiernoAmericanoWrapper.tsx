// src/wrappers/GobiernoAmericanoWrapper.tsx
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../types/navigation';

const GobiernoAmericanoWrapper = () => {
  const navigation = useNavigation<NavigationProps>();

  useEffect(() => {
    navigation.replace('StudyCards', {
      category: 'government',
      title: 'Gobierno Americano',
      subtitle: 'A: Principios de la Democracia Americana',
      questionRange: '1-12',
    });
  }, []);

  return null;
};

export default GobiernoAmericanoWrapper;
