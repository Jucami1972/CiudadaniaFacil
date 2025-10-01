// src/screens/GobiernoAmericanoScreen.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FlipCard from '../components/FlipCard';
import { questions } from '../data/questions';
import { NavigationProps, GovRouteProp } from '../types/navigation';

const GobiernoAmericanoScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NavigationProps>();
  const route = useRoute<GovRouteProp>();
  const subcategory = route.params?.subcategory || 'A: Principios de la Democracia Americana';

  const filtered = questions.filter(
    (q) => q.category === 'government' && q.subcategory === subcategory
  );

  const [index, setIndex] = useState(0);
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const flipRef = useRef<{ reset: () => void } | null>(null);

  useEffect(() => {
    setLanguage('en');
    if (flipRef.current) {
      flipRef.current.reset();
    }
  }, [index]);

  if (filtered.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>No hay preguntas disponibles</Text>
      </SafeAreaView>
    );
  }

  const current = filtered[index];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require('../assets/capitolio.png')}
        style={[styles.header, { paddingTop: insets.top }]}
        resizeMode="cover"
      >
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => nav.goBack()} style={styles.iconButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Tarjetas de Estudio</Text>
          </View>
          <TouchableOpacity onPress={() => nav.navigate('Home')} style={styles.iconButton}>
            <MaterialCommunityIcons name="home" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.titlesContainer}>
        <Text style={styles.categorySubtitle}>{subcategory}</Text>
        <Text style={styles.questionRange}>Pregunta {index + 1} / {filtered.length}</Text>
      </View>

      <View style={styles.langToggle}>
        <TouchableOpacity
          onPress={() => setLanguage('en')}
          style={[styles.langButton, language === 'en' && styles.langActive]}
        >
          <Text style={[styles.langText, language === 'en' && styles.langTextActive]}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLanguage('es')}
          style={[styles.langButton, language === 'es' && styles.langActive]}
        >
          <Text style={[styles.langText, language === 'es' && styles.langTextActive]}>Español</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            nav.navigate('Explanation', {
              questionTitle: language === 'en' ? current.questionEn : current.questionEs,
              explanationEs: current.explanationEs,
              explanationEn: current.explanationEn,
            })
          }
          style={[styles.langButton, styles.explanationButton]}
        >
          <Text style={{ color: 'yellow', fontWeight: '600' }}>Explicación</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlipCard
          key={`${index}-${language}`}
          frontContent={{
            number: current.id,
            question: current.questionEs,
            questionEn: current.questionEn,
          }}
          backContent={{
            answer: current.answerEs,
            answerEn: current.answerEn,
          }}
          language={language}
          isImportant={current.asterisk}
          ref={(ref) => (flipRef.current = ref)}
        />
      </ScrollView>

      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navButton, index === 0 && styles.disabled]}
          onPress={() => index > 0 && setIndex(index - 1)}
          disabled={index === 0}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={28}
            color={index === 0 ? '#ccc' : '#6200ee'}
          />
          <Text style={[styles.navText, index === 0 && styles.disabledText]}>Anterior</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, index === filtered.length - 1 && styles.disabled]}
          onPress={() => index < filtered.length - 1 && setIndex(index + 1)}
          disabled={index === filtered.length - 1}
        >
          <Text style={[styles.navText, index === filtered.length - 1 && styles.disabledText]}>
            Siguiente
          </Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={28}
            color={index === filtered.length - 1 ? '#ccc' : '#6200ee'}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    width: '100%',
    height: Platform.OS === 'ios' ? 100 : 90,
    overflow: 'hidden',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  titlesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#8A1E1E',
    marginTop: 4,
    borderRadius: 20,
  },
  categorySubtitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  questionRange: {
    fontSize: 14,
    color: '#FFF8DC',
    marginTop: 4,
  },
  langToggle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  langButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  explanationButton: {
    backgroundColor: '#ddd',
  },
  langActive: {
    backgroundColor: '#8A1E1E',
  },
  langText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  langTextActive: {
    color: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 140,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navText: {
    color: '#6200ee',
    fontSize: 14,
    marginHorizontal: 4,
  },
  disabled: { opacity: 0.5 },
  disabledText: { color: '#ccc' },
  errorText: {
    padding: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
});

export default GobiernoAmericanoScreen;
