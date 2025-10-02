import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SectionProgress {
  currentIndex: number;
  lastSavedIndex: number;
  sectionId: string;
}

export const useSectionProgress = (sectionId: string, totalQuestions: number) => {
  const [progress, setProgress] = useState<SectionProgress>({
    currentIndex: 0,
    lastSavedIndex: 0,
    sectionId,
  });
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Clave para AsyncStorage
  const progressKey = `@section_progress_${sectionId}`;

  // Cargar progreso guardado al inicializar
  useEffect(() => {
    loadProgress();
  }, [sectionId]);

  // Guardar progreso automáticamente cada 5 preguntas Y cuando el usuario navega
  useEffect(() => {
    if (progress.currentIndex > 0) {
      // Guardar inmediatamente cuando el usuario navega
      saveProgress(progress.currentIndex);
      
      // También guardar cada 5 preguntas para mayor seguridad
      if (progress.currentIndex % 5 === 0) {
        console.log(`Progreso guardado automáticamente en pregunta ${progress.currentIndex + 1}`);
      }
    }
  }, [progress.currentIndex]);

  const loadProgress = async () => {
    try {
      setIsLoading(true);
      const savedProgress = await AsyncStorage.getItem(progressKey);
      
      if (savedProgress) {
        const savedIndex = parseInt(savedProgress, 10);
        if (savedIndex > 0 && savedIndex < totalQuestions) {
          setProgress(prev => ({
            ...prev,
            currentIndex: savedIndex, // Iniciar desde donde quedó
            lastSavedIndex: savedIndex,
          }));
          
          // Mostrar modal solo si hay progreso guardado
          setShowProgressModal(true);
        }
      }
    } catch (error) {
      console.error('Error loading section progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async (index: number) => {
    try {
      await AsyncStorage.setItem(progressKey, index.toString());
      setProgress(prev => ({
        ...prev,
        lastSavedIndex: index,
      }));
    } catch (error) {
      console.error('Error saving section progress:', error);
    }
  };

  const updateCurrentIndex = (index: number) => {
    setProgress(prev => ({
      ...prev,
      currentIndex: index,
    }));
    // Guardar inmediatamente cuando se actualiza el índice
    saveProgress(index);
  };

  const continueFromSaved = () => {
    setProgress(prev => ({
      ...prev,
      currentIndex: prev.lastSavedIndex,
    }));
    setShowProgressModal(false);
  };

  const restartFromBeginning = () => {
    setProgress(prev => ({
      ...prev,
      currentIndex: 0,
      lastSavedIndex: 0,
    }));
    setShowProgressModal(false);
    // Limpiar progreso guardado
    AsyncStorage.removeItem(progressKey);
  };

  const viewAllQuestions = () => {
    setShowProgressModal(false);
    // El usuario puede navegar libremente
  };

  const closeProgressModal = () => {
    setShowProgressModal(false);
    // Mantener el índice actual (no cambiar nada)
  };

  const clearProgress = async () => {
    try {
      await AsyncStorage.removeItem(progressKey);
      setProgress(prev => ({
        ...prev,
        currentIndex: 0,
        lastSavedIndex: 0,
      }));
    } catch (error) {
      console.error('Error clearing section progress:', error);
    }
  };

  // Función para marcar la sección como completada
  const markSectionCompleted = async () => {
    try {
      await AsyncStorage.removeItem(progressKey);
      setProgress(prev => ({
        ...prev,
        currentIndex: 0,
        lastSavedIndex: 0,
      }));
      setShowProgressModal(false);
    } catch (error) {
      console.error('Error marking section as completed:', error);
    }
  };

  return {
    currentIndex: progress.currentIndex,
    lastSavedIndex: progress.lastSavedIndex,
    showProgressModal,
    isLoading,
    updateCurrentIndex,
    continueFromSaved,
    restartFromBeginning,
    viewAllQuestions,
    closeProgressModal,
    saveProgress,
    clearProgress,
    markSectionCompleted,
  };
};
