// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProps } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { PracticeMode } from '../types/question';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const [studyProgress, setStudyProgress] = useState<number>(0);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const viewedRaw = await AsyncStorage.getItem('@study:viewed');
        const viewed = new Set<number>(viewedRaw ? JSON.parse(viewedRaw) : []);
        // total de preguntas definidas es 100 según assets/datos
        const total = 100;
        const pct = Math.max(0, Math.min(100, Math.round((viewed.size / total) * 100)));
        setStudyProgress(pct);
      } catch {}
    };
    const unsubscribe = navigation.addListener('focus', loadProgress);
    loadProgress();
    return unsubscribe;
  }, [navigation]);

  const handlePracticaPress = () => {
    navigation.navigate('PruebaPractica', {
      mode: 'random' as PracticeMode,
      category: 'all',
      section: 'all'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER CURVADO */}
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require('../assets/portada.webp')}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <View style={styles.headerOverlay} />
        </ImageBackground>
      </View>

      {/* CONTENIDO PRINCIPAL */}
      <View style={styles.container}>
        {/* TARJETA 1 – Tarjetas de Estudio */}
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate('TarjetasDeEstudio')}
        >
          <LinearGradient
            colors={['#270483', '#8146cc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuItem}
          >
            <View style={styles.menuContent}>
              <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>Tarjetas de Estudio</Text>
                <Text style={styles.menuSubtitle}>
                  Aprende y practica con tarjetas de estudio
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>{studyProgress}%</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* TARJETA 2 – Prueba Práctica */}
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={handlePracticaPress}
        >
          <LinearGradient
            colors={['#470a56', '#ce32b1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuItem}
          >
            <View style={styles.menuContent}>
              <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>Prueba Práctica</Text>
                <Text style={styles.menuSubtitle}>
                  Simula el examen de Ciudadanía
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>0%</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* TARJETA 3 – Vocabulario */}
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate('Vocabulario')}
        >
          <LinearGradient
            colors={['#270483', '#8146cc']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuItem}
          >
            <View style={styles.menuContent}>
              <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>Vocabulario</Text>
                <Text style={styles.menuSubtitle}>
                  Palabras clave del examen
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>0%</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* TARJETA 4 – Entrevista AI */}
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate('EntrevistaAI')}
        >
          <LinearGradient
            colors={['#470a56', '#ce32b1']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuItem}
          >
            <View style={styles.menuContent}>
              <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>Entrevista AI</Text>
                <Text style={styles.menuSubtitle}>
                  Practica la entrevista
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>0%</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* TARJETA 5 – Examen */}
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate('Examen')}
        >
          <LinearGradient
            colors={['#1B5E20', '#4CAF50']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.menuItem}
          >
            <View style={styles.menuContent}>
              <View style={styles.textContainer}>
                <Text style={styles.menuTitle}>Examen</Text>
                <Text style={styles.menuSubtitle}>
                  10 preguntas aleatorias (pasa con 6)
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>–%</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#f5f5f5',
    ...(Platform.OS === 'web' && {
      paddingTop: 20, // Espaciado superior para web
    }),
  },
  headerWrapper: {
    width,
    height: Platform.OS === 'web' ? 300 : 200, // Más alto en web
    overflow: 'hidden',
    borderBottomRightRadius: 90,
    ...(Platform.OS === 'web' && {
      marginHorizontal: 'auto', // Centrar en web
      maxWidth: 1200, // Ancho máximo para pantallas grandes
      borderRadius: 20, // Bordes redondeados en web
      marginTop: 10,
      marginBottom: 20,
    }),
  },
  headerBackground: { 
    width: '100%', 
    height: '100%',
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Platform.OS === 'web' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
  },
  container: {
    flex: 1,
    padding: Platform.OS === 'web' ? 24 : 16,
    alignItems: 'center',
    ...(Platform.OS === 'web' && {
      maxWidth: 1200,
      marginHorizontal: 'auto',
      width: '100%',
    }),
  },
  menuItemContainer: {
    width: Platform.OS === 'web' ? Math.min(width * 0.9, 800) : width * 0.9,
    marginBottom: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    ...(Platform.OS === 'web' && {
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-2px)',
      },
    }),
  },
  menuItem: { 
    height: 100, 
    borderRadius: 20, 
    padding: 16 
  },
  menuContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: { 
    flex: 1, 
    marginRight: 16 
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  menuSubtitle: { 
    fontSize: 14, 
    color: '#FFD700' 
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2645ca',
  },
  progressText: {
    fontSize: 16,
    color: '#444',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
