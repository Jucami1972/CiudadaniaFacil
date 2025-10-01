import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import type { PracticeModeScreenRouteProp } from '../../types/navigation';
import { NavigationProps } from '../../types/navigation';
import { questions } from '../../data/questions';

interface PracticeMode {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  gradient: [string, string];
  type: 'written-written' | 'written-oral' | 'audio-written' | 'audio-oral';
}

const PracticeModeScreen = () => {
  const route = useRoute<PracticeModeScreenRouteProp>();
  const navigation = useNavigation<NavigationProps>();
  const { mode, category } = route.params;
  
  const [availableQuestions, setAvailableQuestions] = useState<typeof questions>([]);

  useEffect(() => {
    if (category) {
      // Filtrar preguntas por categoría
      const filtered = questions.filter(q => q.category === category);
      setAvailableQuestions(filtered);
    }
  }, [category]);

  const practiceModes: PracticeMode[] = [
    {
      id: 'written-written',
      title: 'Pregunta Escrita\nRespuesta Escrita',
      description: 'Lee la pregunta y escribe tu respuesta para revisión',
      icon: 'pencil',
      gradient: ['#2196F3', '#1976D2'],
      type: 'written-written'
    },
    {
      id: 'written-oral',
      title: 'Pregunta Escrita\nRespuesta Oral',
      description: 'Lee la pregunta y responde hablando',
      icon: 'microphone',
      gradient: ['#4CAF50', '#388E3C'],
      type: 'written-oral'
    },
    {
      id: 'audio-written',
      title: 'Pregunta en Audio\nRespuesta Escrita',
      description: 'Escucha la pregunta y escribe tu respuesta',
      icon: 'headphones',
      gradient: ['#FF9800', '#F57C00'],
      type: 'audio-written'
    },
    {
      id: 'audio-oral',
      title: 'Pregunta en Audio\nRespuesta Oral',
      description: 'Escucha la pregunta y responde hablando',
      icon: 'microphone-variant',
      gradient: ['#9C27B0', '#7B1FA2'],
      type: 'audio-oral'
    }
  ];

  const handlePracticeModeSelect = (selectedMode: PracticeMode) => {
    if (availableQuestions.length === 0) {
      Alert.alert('Error', 'No hay preguntas disponibles para esta categoría');
      return;
    }

    // Navegar a la pantalla de práctica con el modo seleccionado
    navigation.navigate('Practice', {
      mode: 'category',
      category: category || '',
      section: '',
      type: selectedMode.type
    });
  };

  const getCategoryTitle = (categoryId: string) => {
    const categoryMap: { [key: string]: string } = {
      'government': 'Gobierno Americano',
      'history': 'Historia Americana',
      'civics': 'Educación Cívica'
    };
    return categoryMap[categoryId] || 'Categoría';
  };

  const getCategoryIcon = (categoryId: string) => {
    const iconMap: { [key: string]: keyof typeof MaterialCommunityIcons.glyphMap } = {
      'government': 'bank',
      'history': 'book-open-page-variant',
      'civics': 'school'
    };
    return iconMap[categoryId] || 'help-circle';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            <Text style={styles.backButtonText}>Regresar</Text>
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <MaterialCommunityIcons 
              name={getCategoryIcon(category || '')} 
              size={32} 
              color="white" 
            />
            <Text style={styles.headerTitle}>{getCategoryTitle(category || '')}</Text>
            <Text style={styles.questionCount}>
              {availableQuestions.length} preguntas disponibles
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Selecciona el Modo de Práctica</Text>
          
          {practiceModes.map((practiceMode) => (
            <TouchableOpacity
              key={practiceMode.id}
              style={styles.practiceModeCard}
              onPress={() => handlePracticeModeSelect(practiceMode)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={practiceMode.gradient}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={practiceMode.icon} 
                    size={40} 
                    color="white" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.modeTitle}>{practiceMode.title}</Text>
                  <Text style={styles.modeDescription}>{practiceMode.description}</Text>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color="white" 
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}

          {/* Información adicional */}
          <View style={styles.infoContainer}>
            <MaterialCommunityIcons name="information" size={24} color="#666" />
            <Text style={styles.infoText}>
              Las preguntas se seleccionan aleatoriamente de la categoría elegida
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 16,
    paddingTop: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  headerInfo: {
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  questionCount: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  practiceModeCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  modeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
    lineHeight: 24,
  },
  modeDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  infoText: {
    marginLeft: 12,
    color: '#1976d2',
    fontSize: 14,
    flex: 1,
  },
});

export default PracticeModeScreen; 