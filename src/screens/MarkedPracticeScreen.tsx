// src/screens/MarkedPracticeScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProps, PracticeMode } from '../types/navigation';

import { colors } from '../constants/colors';
import { spacing, radius, shadow } from '../constants/spacing';
import { fontSize, fontWeight } from '../constants/typography';

interface MarkedQuestion {
  id: string;
  question: string;
  category: string;
  markedDate: string;
}

const MarkedPracticeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(true);
  const [markedQuestions, setMarkedQuestions] = useState<MarkedQuestion[]>([]);

  useEffect(() => {
    loadMarkedQuestions();
  }, []);

  const loadMarkedQuestions = async () => {
    try {
      // Cargar preguntas marcadas desde AsyncStorage
      const markedData = await AsyncStorage.getItem('@practice:marked');
      
      if (markedData) {
        const markedIds = JSON.parse(markedData);
        // Aquí podrías cargar las preguntas completas desde practiceQuestions.tsx
        // Por ahora mantenemos la simulación
        const mockData: MarkedQuestion[] = [
          {
            id: '1',
            question: '¿Cuál es la capital de los Estados Unidos?',
            category: 'Gobierno Americano',
            markedDate: '2023-12-01',
          },
        ];
        
        setMarkedQuestions(mockData);
      } else {
        setMarkedQuestions([]);
      }
    } catch (error) {
      console.error('Error loading marked questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startPractice = () => {
    navigation.navigate('PruebaPractica', {
      mode: 'marked' as PracticeMode,
      category: 'Marcadas',
      section: 'Preguntas Marcadas',
    });
  };

  const renderQuestion = ({ item }: { item: MarkedQuestion }) => (
    <View style={styles.questionCard}>
      <View style={styles.questionHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.markedDate}>
          Marcada: {new Date(item.markedDate).toLocaleDateString()}
        </Text>
      </View>
      <Text style={styles.questionText}>{item.question}</Text>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons 
        name="bookmark-outline" 
        size={64} 
        color={colors.primary.main} 
      />
      <Text style={styles.emptyTitle}>No hay preguntas marcadas</Text>
      <Text style={styles.emptyDescription}>
        Marca las preguntas que quieras repasar más tarde.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Volver atrás"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preguntas Marcadas</Text>
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
          accessibilityLabel="Ir al inicio"
          accessibilityRole="button"
        >
          <MaterialCommunityIcons name="home" size={24} color={colors.text.dark} />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.main} />
          <Text style={styles.loadingText}>Cargando preguntas...</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={markedQuestions}
            renderItem={renderQuestion}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={
              markedQuestions.length > 0 ? (
                <Text style={styles.subtitle}>
                  {markedQuestions.length} preguntas marcadas
                </Text>
              ) : null
            }
          />

          {markedQuestions.length > 0 && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.startButton}
                onPress={startPractice}
                accessibilityLabel="Comenzar práctica"
                accessibilityRole="button"
              >
                <LinearGradient
                  colors={colors.primary.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientButton}
                >
                  <Text style={styles.buttonText}>Comenzar Práctica</Text>
                  <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    height: Platform.OS === 'ios' ? 60 : 50,
    backgroundColor: colors.neutral.card,
    ...shadow.sm,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  homeButton: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    backgroundColor: colors.neutral.background,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
  },
  headerTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.dark,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.md,
    color: colors.text.dark,
  },
  listContainer: {
    padding: spacing.lg,
    flexGrow: 1,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.light,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: colors.neutral.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  category: {
    fontSize: fontSize.sm,
    color: colors.primary.main,
    fontWeight: fontWeight.medium,
  },
  markedDate: {
    fontSize: fontSize.sm,
    color: colors.text.light,
  },
  questionText: {
    fontSize: fontSize.md,
    color: colors.text.dark,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text.dark,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    fontSize: fontSize.md,
    color: colors.text.light,
    textAlign: 'center',
  },
  bottomContainer: {
    padding: spacing.lg,
    backgroundColor: colors.neutral.card,
    ...shadow.lg,
  },
  startButton: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  buttonText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: 'white',
    marginRight: spacing.sm,
  },
});

export default MarkedPracticeScreen;
