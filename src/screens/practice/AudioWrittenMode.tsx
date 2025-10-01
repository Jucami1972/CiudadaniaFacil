import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
  ScrollView,
  Animated,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import { questions } from '../../data/questions';
import { questionsMap } from '../../assets/audio/questions/questionsMap';

interface AudioWrittenModeProps {
  category: string;
  onComplete: (score: number, total: number) => void;
}

const AudioWrittenMode: React.FC<AudioWrittenModeProps> = ({ category, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [questionsForPractice, setQuestionsForPractice] = useState<typeof questions>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playButtonAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    // Filtrar preguntas por categoría y seleccionar 10 aleatorias
    const filteredQuestions = questions.filter(q => q.category === category);
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, 10);
    setQuestionsForPractice(selectedQuestions);

    // Configurar audio
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Se requieren permisos de audio para esta funcionalidad');
      }
    })();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [category]);

  const currentQuestion = questionsForPractice[currentQuestionIndex];

  // Animación del botón de reproducción
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(playButtonAnim, {
            toValue: 1.1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(playButtonAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      playButtonAnim.setValue(1);
    }
  }, [isPlaying]);

  const playQuestionAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      // Obtener el archivo de audio correspondiente a la pregunta
      const questionNumber = currentQuestion.id.toString().padStart(3, '0');
      const audioFileName = `q${questionNumber}_question.mp3`;
      
      // Verificar si existe el archivo en el mapeo
      if (questionsMap[questionNumber]) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          questionsMap[questionNumber]
        );
        
        setSound(newSound);
        setIsPlaying(true);
        
        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
          }
        });
        
        await newSound.playAsync();
      } else {
        Alert.alert('Error', 'Archivo de audio no encontrado para esta pregunta');
      }
    } catch (error) {
      console.error('Error al reproducir audio:', error);
      Alert.alert('Error', 'No se pudo reproducir el audio');
    }
  };

  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error al detener audio:', error);
    }
  };

  const checkAnswer = () => {
    if (!userAnswer.trim()) {
      Alert.alert('Error', 'Por favor escribe tu respuesta');
      return;
    }

    // Comparar la respuesta del usuario con la respuesta correcta
    const correctAnswer = currentQuestion.answerEn.toLowerCase().trim();
    const userAnswerLower = userAnswer.toLowerCase().trim();
    
    // Lógica de comparación más flexible
    const isAnswerCorrect = compareAnswers(userAnswerLower, correctAnswer);
    
    setIsCorrect(isAnswerCorrect);
    setShowResult(true);
    
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    
    setTotalAnswered(totalAnswered + 1);
  };

  const compareAnswers = (userAnswer: string, correctAnswer: string): boolean => {
    // Normalizar respuestas
    const normalize = (str: string) => str
      .replace(/[.,;:!?]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();

    const normalizedUser = normalize(userAnswer);
    const normalizedCorrect = normalize(correctAnswer);

    // Comparación exacta
    if (normalizedUser === normalizedCorrect) return true;

    // Comparación por palabras clave (para respuestas largas)
    const userWords = normalizedUser.split(' ').filter(word => word.length > 2);
    const correctWords = normalizedCorrect.split(' ').filter(word => word.length > 2);
    
    const matchingWords = userWords.filter(word => correctWords.includes(word));
    const matchPercentage = matchingWords.length / Math.max(userWords.length, correctWords.length);
    
    return matchPercentage >= 0.7; // 70% de coincidencia
  };

  const nextQuestion = () => {
    setUserAnswer('');
    setShowResult(false);
    
    if (sound) {
      sound.unloadAsync();
      setSound(null);
    }
    
    if (currentQuestionIndex < questionsForPractice.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Práctica completada
      onComplete(score, questionsForPractice.length);
    }
  };

  const getFeedbackIcon = () => {
    if (isCorrect) {
      return <MaterialCommunityIcons name="check-circle" size={60} color="#4CAF50" />;
    } else {
      return <MaterialCommunityIcons name="close-circle" size={60} color="#F44336" />;
    }
  };

  const getFeedbackColor = () => {
    return isCorrect ? ['#4CAF50', '#388E3C'] : ['#F44336', '#D32F2F'];
  };

  if (questionsForPractice.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Cargando preguntas...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.progressText}>
          Pregunta {currentQuestionIndex + 1} de {questionsForPractice.length}
        </Text>
        <Text style={styles.scoreText}>
          Puntuación: {score}/{totalAnswered}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Instrucciones */}
        <View style={styles.instructionsContainer}>
          <MaterialCommunityIcons name="headphones" size={24} color="#666" />
          <Text style={styles.instructionsText}>
            Escucha la pregunta en audio y escribe tu respuesta
          </Text>
        </View>

        {/* Botón de reproducción de audio */}
        {!showResult && (
          <View style={styles.audioContainer}>
            <Animated.View style={{ transform: [{ scale: playButtonAnim }] }}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={isPlaying ? stopAudio : playQuestionAudio}
              >
                <LinearGradient
                  colors={isPlaying ? ['#FF9800', '#F57C00'] : ['#FF9800', '#F57C00']}
                  style={styles.playButtonGradient}
                >
                  <MaterialCommunityIcons 
                    name={isPlaying ? 'stop' : 'play'} 
                    size={40} 
                    color="white" 
                  />
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>
            
            <Text style={styles.playButtonText}>
              {isPlaying ? 'Toca para detener' : 'Toca para escuchar la pregunta'}
            </Text>
          </View>
        )}

        {/* Respuesta del usuario */}
        <View style={styles.answerContainer}>
          <Text style={styles.answerLabel}>Tu respuesta:</Text>
          <TextInput
            style={styles.answerInput}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder="Escribe tu respuesta aquí..."
            multiline
            numberOfLines={4}
            editable={!showResult}
          />
        </View>

        {/* Botón de revisar */}
        {!showResult && (
          <TouchableOpacity
            style={styles.checkButton}
            onPress={checkAnswer}
            disabled={!userAnswer.trim()}
          >
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.checkButtonGradient}
            >
              <MaterialCommunityIcons name="check" size={24} color="white" />
              <Text style={styles.checkButtonText}>Revisar Respuesta</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Resultado */}
        {showResult && (
          <View style={styles.resultContainer}>
            <LinearGradient
              colors={getFeedbackColor()}
              style={styles.resultGradient}
            >
              <View style={styles.resultHeader}>
                {getFeedbackIcon()}
                <Text style={styles.resultTitle}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </Text>
              </View>
              
              <View style={styles.correctAnswerContainer}>
                <Text style={styles.correctAnswerLabel}>Respuesta correcta:</Text>
                <Text style={styles.correctAnswerText}>{currentQuestion.answerEn}</Text>
              </View>

              {!isCorrect && (
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationLabel}>Explicación:</Text>
                  <Text style={styles.explanationText}>{currentQuestion.explanationEn}</Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.nextButton}
                onPress={nextQuestion}
              >
                <Text style={styles.nextButtonText}>
                  {currentQuestionIndex < questionsForPractice.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  instructionsText: {
    marginLeft: 12,
    color: '#e65100',
    fontSize: 14,
    flex: 1,
  },
  audioContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    marginBottom: 16,
  },
  playButtonGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  playButtonText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  answerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
  },
  answerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  answerInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  checkButton: {
    marginBottom: 20,
  },
  checkButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  checkButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultGradient: {
    padding: 20,
    borderRadius: 12,
  },
  resultHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  resultTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  correctAnswerContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  correctAnswerLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctAnswerText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  explanationContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  explanationLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  explanationText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AudioWrittenMode;
