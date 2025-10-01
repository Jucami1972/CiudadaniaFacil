import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface VisualOralModeProps {
  question: {
    id: string;
    text: string;
  };
  answer: string;
  language: 'en' | 'es';
  onNext: (isCorrect: boolean) => void;
}

export const VisualOralMode: React.FC<VisualOralModeProps> = ({
  question,
  answer,
  language,
  onNext,
}) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswer = (isCorrect: boolean) => {
    setUserAnswer(isCorrect ? 'correct' : 'incorrect');
    onNext(isCorrect);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question.text}</Text>
      </View>

      <View style={styles.answerContainer}>
        {!showAnswer ? (
          <TouchableOpacity
            style={styles.showAnswerButton}
            onPress={() => setShowAnswer(true)}
          >
            <Text style={styles.showAnswerButtonText}>
              {language === 'en' ? 'Show Answer' : 'Mostrar Respuesta'}
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={styles.answerText}>{answer}</Text>
            <View style={styles.feedbackButtons}>
              <TouchableOpacity
                style={[styles.feedbackButton, styles.correctButton]}
                onPress={() => handleAnswer(true)}
                disabled={userAnswer !== null}
              >
                <MaterialCommunityIcons name="check" size={24} color="white" />
                <Text style={styles.feedbackButtonText}>
                  {language === 'en' ? 'I Got It Right' : 'Lo Sabía'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.feedbackButton, styles.incorrectButton]}
                onPress={() => handleAnswer(false)}
                disabled={userAnswer !== null}
              >
                <MaterialCommunityIcons name="close" size={24} color="white" />
                <Text style={styles.feedbackButtonText}>
                  {language === 'en' ? 'I Got It Wrong' : 'No Lo Sabía'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      {userAnswer !== null && (
        <View style={[styles.resultContainer, userAnswer === 'correct' ? styles.correctResult : styles.incorrectResult]}>
          <MaterialCommunityIcons
            name={userAnswer === 'correct' ? 'check-circle' : 'close-circle'}
            size={24}
            color={userAnswer === 'correct' ? '#4CAF50' : '#F44336'}
          />
          <Text style={styles.resultText}>
            {userAnswer === 'correct'
              ? language === 'en'
                ? 'Great job!'
                : '¡Excelente!'
              : language === 'en'
              ? 'Keep practicing!'
              : '¡Sigue practicando!'}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  questionContainer: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 24,
    color: '#333',
  },
  answerContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  showAnswerButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  showAnswerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  answerText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 16,
  },
  feedbackButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  feedbackButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  incorrectButton: {
    backgroundColor: '#F44336',
  },
  feedbackButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  correctResult: {
    backgroundColor: '#E8F5E9',
  },
  incorrectResult: {
    backgroundColor: '#FFEBEE',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '500',
  },
}); 