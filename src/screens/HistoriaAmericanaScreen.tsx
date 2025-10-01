// src/screens/HistoriaAmericanaScreen.tsx

import React from 'react';
import { useNavigation } from '@react-navigation/native';
import StudyCardsScreen from './StudyCardsScreen';
import { NavigationProps } from '../types/navigation';

const HistoriaAmericanaScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <StudyCardsScreen
      route={{
        key: 'HistoriaAmericanaKey',
        name: 'StudyCards',
        params: {
          category: 'history',
          title: 'Historia Americana',
          subtitle: 'A: Período Colonial e Independencia',
          questionRange: '58-70',
        },
      }}
      navigation={navigation}
    />
  );
};

export default HistoriaAmericanaScreen;
