import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { questionAudioMap } from '../../assets/audio/questions/questionsMap';
import { answerAudioMap } from '../../assets/audio/answers/answersMap';

interface VisualWrittenModeProps {
  question: {
    number: number;
    text: string;
    textEn: string;
  };
  answer: {
    text: string;
    textEn: string;
  };
  language: 'en' | 'es';
  onNext: (isCorrect: boolean) => void;
}

const VisualWrittenMode: React.FC<VisualWrittenModeProps> = ({
  question,
  answer,
  language,
  onNext,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playQuestionAudio = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        questionAudioMap[question.number]
      );
      setSound(newSound);
      setIsPlaying(true);
      await newSound.playAsync();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && !status.isPlaying) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const checkAnswer = () => {
    const correctAnswer = language === 'en' ? answer.textEn : answer.text;
    const isAnswerCorrect = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();
    setIsCorrect(isAnswerCorrect);
    setShowAnswer(true);
  };

  const handleNext = () => {
    onNext(isCorrect);
    setUserAnswer('');
    setShowAnswer(false);
    setIsCorrect(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>Pregunta #{question.number}</Text>
          <Text style={styles.questionText}>
            {language === 'en' ? question.textEn : question.text}
          </Text>
          
          <TouchableOpacity
            style={styles.audioButton}
            onPress={playQuestionAudio}
            disabled={isPlaying}
          >
            <MaterialCommunityIcons
              name={isPlaying ? 'stop' : 'volume-high'}
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.answerContainer}>
          <TextInput
            style={styles.input}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder={language === 'en' ? 'Type your answer...' : 'Escribe tu respuesta...'}
            placeholderTextColor="#666"
            multiline
            textAlignVertical="top"
          />

          {!showAnswer ? (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={checkAnswer}
              disabled={!userAnswer.trim()}
            >
              <Text style={styles.checkButtonText}>
                {language === 'en' ? 'Check Answer' : 'Verificar Respuesta'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.resultContainer}>
              <View style={[styles.resultBox, isCorrect ? styles.correct : styles.incorrect]}>
                <MaterialCommunityIcons
                  name={isCorrect ? 'check-circle' : 'close-circle'}
                  size={24}
                  color="white"
                />
                <Text style={styles.resultText}>
                  {isCorrect
                    ? language === 'en'
                      ? 'Correct!'
                      : '¡Correcto!'
                    : language === 'en'
                    ? 'Incorrect'
                    : 'Incorrecto'}
                </Text>
              </View>

              {!isCorrect && (
                <View style={styles.correctAnswerContainer}>
                  <Text style={styles.correctAnswerLabel}>
                    {language === 'en' ? 'Correct Answer:' : 'Respuesta Correcta:'}
                  </Text>
                  <Text style={styles.correctAnswer}>
                    {language === 'en' ? answer.textEn : answer.text}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
              >
                <Text style={styles.nextButtonText}>
                  {language === 'en' ? 'Next Question' : 'Siguiente Pregunta'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  questionContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionNumber: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  audioButton: {
    backgroundColor: '#6200ee',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  answerContainer: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    gap: 16,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  correct: {
    backgroundColor: '#4CAF50',
  },
  incorrect: {
    backgroundColor: '#F44336',
  },
  resultText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  correctAnswerContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  correctAnswerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  correctAnswer: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VisualWrittenMode; 