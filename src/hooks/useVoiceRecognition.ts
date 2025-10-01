import { useState, useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech'; // Changed from Voice from '@react-native-voice/voice';

interface UseVoiceRecognitionProps {
  onSpeechResult?: (text: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

export const useVoiceRecognition = ({
  onSpeechResult,
  onError,
  onStart,
  onEnd
}: UseVoiceRecognitionProps = {}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true); // expo-speech siempre está disponible
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkVoiceSupport();
    // setupVoiceListeners(); // Removed
    return () => {
      // cleanup si es necesario // Removed cleanupVoiceListeners
    };
  }, []);

  const checkVoiceSupport = async () => {
    try {
      // expo-speech siempre está disponible en Expo Go
      setIsSupported(true);
      console.log('Voice recognition available: true (expo-speech)');
    } catch (error) {
      console.error('Error checking voice support:', error);
      setIsSupported(false);
    }
  };

  // setupVoiceListeners and cleanupVoiceListeners functions removed

  const startRecording = useCallback(async (language: string = 'en-US') => {
    if (!isSupported) {
      const errorMsg = 'El reconocimiento de voz no está disponible en este dispositivo';
      setError(errorMsg);
      onError?.(errorMsg);
      return;
    }

    try {
      setError(null);
      setIsRecording(true);
      onStart?.();

      console.log('Starting voice recognition simulation with language:', language);

      // Simular reconocimiento de voz con expo-speech
      // En una implementación real, esto sería reemplazado por un servicio de reconocimiento
      // Por ahora, simulamos el proceso

      // Simular que está escuchando
      setTimeout(() => {
        if (isRecording) {
          // Simular resultado de reconocimiento
          const mockResult = "Respuesta simulada del reconocimiento de voz";
          console.log('Simulated voice recognition result:', mockResult);
          onSpeechResult?.(mockResult);
          setIsRecording(false);
          onEnd?.();
        }
      }, 3000); // Simular 3 segundos de "escucha"

    } catch (error) {
      console.error('Error starting voice recognition:', error);
      const errorMsg = 'Error al iniciar el reconocimiento de voz';
      setError(errorMsg);
      onError?.(errorMsg);
      setIsRecording(false);
    }
  }, [isSupported, onError, onStart, onEnd, onSpeechResult]);

  const stopRecording = useCallback(async () => {
    try {
      console.log('Stopping voice recognition simulation...');
      setIsRecording(false);
      onEnd?.();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  }, [onEnd]);

  const destroy = useCallback(async () => {
    try {
      // Cleanup si es necesario
      setIsRecording(false);
    } catch (error) {
      console.error('Error destroying voice recognition:', error);
    }
  }, []);

  return {
    isRecording,
    isSupported,
    error,
    startRecording,
    stopRecording,
    destroy,
  };
};
