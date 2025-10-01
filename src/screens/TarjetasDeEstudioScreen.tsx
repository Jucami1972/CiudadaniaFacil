import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProps } from '../types/navigation';

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#6200ee',
    },
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#6200ee',
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
    },
    backButtonText: {
      color: 'white',
      marginLeft: 8,
      fontSize: 16,
    },
    headerTitle: {
      flex: 1,
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginRight: 40,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    categoryGroup: {
      marginBottom: 24,
    },
    mainCategoryTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 12,
    },
    categoryCard: {
      backgroundColor: 'white',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    categoryTitle: {
      fontSize: 16,
      color: '#333',
      marginBottom: 4,
    },
    questionRange: {
      fontSize: 14,
      color: '#666',
    },
  });
  