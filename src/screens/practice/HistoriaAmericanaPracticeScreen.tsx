import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProps } from '../../types/navigation';

const sections = [
  {
    id: 'colonial',
    title: 'Período Colonial',
    description: 'Preguntas sobre la época colonial y la fundación de Estados Unidos',
  },
  {
    id: 'independence',
    title: 'Independencia y Constitución',
    description: 'Preguntas sobre la independencia y la creación de la Constitución',
  },
  {
    id: 'expansion',
    title: 'Expansión y Guerra Civil',
    description: 'Preguntas sobre la expansión territorial y la Guerra Civil',
  },
  {
    id: 'modern',
    title: 'Historia Moderna',
    description: 'Preguntas sobre la historia reciente de Estados Unidos',
  },
];

const HistoriaAmericanaPracticeScreen = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleSectionPress = (sectionId: string) => {
    navigation.navigate('PruebaPractica', {
      category: 'history',
      section: sectionId,
      mode: 'category',
      type: 'written'
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
            <Text style={styles.backButtonText}>Regresar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Historia Americana</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Selecciona un Período</Text>
          {sections.map((section) => (
            <TouchableOpacity
              key={section.id}
              style={styles.sectionContainer}
              onPress={() => handleSectionPress(section.id)}
            >
              <LinearGradient
                colors={['#0D47A1', '#2196F3']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.sectionGradient}
              >
                <MaterialCommunityIcons 
                  name="book-open-variant" 
                  size={32} 
                  color="white" 
                />
                <View style={styles.sectionTextContainer}>
                  <Text style={styles.sectionTitleText}>{section.title}</Text>
                  <Text style={styles.sectionDescription}>
                    {section.description}
                  </Text>
                </View>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={24} 
                  color="white" 
                />
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6200ee',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  backButtonText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  sectionContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  sectionTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default HistoriaAmericanaPracticeScreen; 