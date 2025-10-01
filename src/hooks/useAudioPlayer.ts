import { useState, useCallback, useEffect } from 'react';
import { Audio } from 'expo-av';

interface UseAudioPlayerProps {
  audioSource: any;
}

interface UseAudioPlayerReturn {
  sound: Audio.Sound | null;
  isPlaying: boolean;
  playCount: number;
  playAudio: () => Promise<void>;
  stopAudio: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export const useAudioPlayer = ({ audioSource }: UseAudioPlayerProps): UseAudioPlayerReturn => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playAudio = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Limpiar audio anterior
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      
      // Crear y reproducir nuevo audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
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
      setIsPlaying(true);
      setPlayCount(prev => prev + 1);
      
      // Configurar callbacks de estado
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          if (status.didJustFinish) {
            setIsPlaying(false);
            setSound(null);
          } else if (!status.isPlaying) {
            setIsPlaying(false);
          }
        }
      });
      
    } catch (err) {
      console.error('Error playing audio:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setIsPlaying(false);
      setSound(null);
    } finally {
      setIsLoading(false);
    }
  }, [audioSource, sound]);

  const stopAudio = useCallback(async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (err) {
      console.error('Error stopping audio:', err);
    }
  }, [sound]);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync().catch(console.error);
      }
    };
  }, [sound]);

  return {
    sound,
    isPlaying,
    playCount,
    playAudio,
    stopAudio,
    isLoading,
    error,
  };
};

