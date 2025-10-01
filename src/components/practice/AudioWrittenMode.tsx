import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface AudioWrittenModeProps {
  question: {
    id: string;
    text: string;
    audioUrl: string;
  };
  answer: string;
  language: 'en' | 'es';
  onNext: (isCorrect: boolean) => void;
}

export const AudioWrittenMode: React.FC<AudioWrittenModeProps> = ({
  question,
  answer,
  language,
  onNext,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [playCount, setPlayCount] = useState(0);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playAudio = async () => {
    try {
      // Limpiar audio anterior antes de crear uno nuevo
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: question.audioUrl },
        { 
          shouldPlay: true,
          isLooping: false,
          volume: 1.0,
          rate: 1.0,
          shouldCorrectPitch: true,
          progressUpdateIntervalMillis: 1000,
        }
      );
      
      setSound(newSound);
      setPlayCount(prev => prev + 1);
      
      // Auto-cleanup cuando termine la reproducción
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setSound(null);
        }
      });
    } catch (error) {
      console.error('Error playing audio:', error);
      setSound(null);
    }
  };

  const checkAnswer = () => {
    const correct = userAnswer.toLowerCase().trim() === answer.toLowerCase().trim();
    setIsCorrect(correct);
    onNext(correct);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.questionContainer}>
          <TouchableOpacity onPress={playAudio} style={styles.playButton}>
            <MaterialCommunityIcons name="play-circle" size={48} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.playCount}>
            {language === 'en' ? 'Times played: ' : 'Veces reproducido: '}
            {playCount}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={userAnswer}
            onChangeText={setUserAnswer}
            placeholder={language === 'en' ? 'Type your answer' : 'Escribe tu respuesta'}
            placeholderTextColor="#999"
            multiline
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={[styles.checkButton, isCorrect !== null && styles.disabledButton]}
          onPress={checkAnswer}
          disabled={isCorrect !== null}
        >
          <Text style={styles.checkButtonText}>
            {language === 'en' ? 'Check Answer' : 'Verificar Respuesta'}
          </Text>
        </TouchableOpacity>

        {isCorrect !== null && (
          <View style={[styles.feedbackContainer, isCorrect ? styles.correct : styles.incorrect]}>
            <MaterialCommunityIcons
              name={isCorrect ? 'check-circle' : 'close-circle'}
              size={24}
              color={isCorrect ? '#4CAF50' : '#F44336'}
            />
            <Text style={styles.feedbackText}>
              {isCorrect
                ? language === 'en'
                  ? 'Correct!'
                  : '¡Correcto!'
                : language === 'en'
                ? 'Incorrect. Try again!'
                : 'Incorrecto. ¡Inténtalo de nuevo!'}
            </Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  questionContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  playButton: {
    marginBottom: 8,
  },
  playCount: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flex: 1,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  checkButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  correct: {
    backgroundColor: '#E8F5E9',
  },
  incorrect: {
    backgroundColor: '#FFEBEE',
  },
  feedbackText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
}); 