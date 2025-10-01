import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProps } from '../../types/navigation';
import { GovernmentSubcategory } from '../../types/navigation';

const subcategories: { id: GovernmentSubcategory; title: string; description: string }[] = [
  {
    id: 'A: Principios de la Democracia Americana',
    title: 'Principios de la Democracia Americana',
    description: 'Preguntas sobre los principios fundamentales de la democracia americana',
  },
  {
    id: 'B: Sistema de Gobierno',
    title: 'Sistema de Gobierno',
    description: 'Preguntas sobre la estructura y funcionamiento del gobierno',
  },
  {
    id: 'C: Derechos y Responsabilidades',
    title: 'Derechos y Responsabilidades',
    description: 'Preguntas sobre derechos y responsabilidades cívicas',
  },
];

const GobiernoAmericanoPracticeScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute();

  const handleSubcategoryPress = (subcategory: GovernmentSubcategory) => {
    navigation.navigate('Practice', {
      category: 'government',
      section: subcategory,
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
          <Text style={styles.headerTitle}>Gobierno Americano</Text>
        </View>

        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Selecciona una Subcategoría</Text>
          {subcategories.map((subcategory) => (
            <TouchableOpacity
              key={subcategory.id}
              style={styles.subcategoryContainer}
              onPress={() => handleSubcategoryPress(subcategory.id)}
            >
              <LinearGradient
                colors={['#1B5E20', '#4CAF50']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subcategoryGradient}
              >
                <MaterialCommunityIcons 
                  name="account-group" 
                  size={32} 
                  color="white" 
                />
                <View style={styles.subcategoryTextContainer}>
                  <Text style={styles.subcategoryTitle}>{subcategory.title}</Text>
                  <Text style={styles.subcategoryDescription}>
                    {subcategory.description}
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
  subcategoryContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subcategoryGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  subcategoryTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  subcategoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subcategoryDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default GobiernoAmericanoPracticeScreen; 