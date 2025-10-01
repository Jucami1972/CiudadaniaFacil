import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PracticeStackParamList } from '../../navigation/PracticeNavigator';

type ResultsScreenNavigationProp = StackNavigationProp<PracticeStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<PracticeStackParamList, 'Results'>;

export const ResultsScreen = () => {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const { correctAnswers, totalQuestions, type, mode } = route.params;

  const percentage = (correctAnswers / totalQuestions) * 100;
  const isPassing = percentage >= 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name={isPassing ? 'check-circle' : 'alert-circle'}
          size={64}
          color={isPassing ? '#4CAF50' : '#F44336'}
        />
        <Text style={styles.title}>
          {isPassing ? '¡Felicidades!' : 'Necesitas más práctica'}
        </Text>
        <Text style={styles.subtitle}>
          {correctAnswers} de {totalQuestions} respuestas correctas
        </Text>
        <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.detailText}>Tipo: {type === 'written' ? 'Escrita' : 'Oral'}</Text>
        <Text style={styles.detailText}>Modo: {mode}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PracticeType')}
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  details: {
    marginBottom: 32,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 