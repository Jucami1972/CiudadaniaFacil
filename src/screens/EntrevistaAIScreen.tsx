import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../constants/colors';
import { spacing, radius, shadow } from '../constants/spacing';
import { NavigationProps } from '../types/navigation';

const EntrevistaAIScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Volver atrás"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text.dark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Entrevista AI</Text>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.navigate('Home')}
            accessibilityLabel="Ir al inicio"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="home" size={24} color={colors.text.dark} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text>Entrevista con AI - En construcción</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.neutral?.background || '#f5f5f5',
  },
  header: {
    backgroundColor: '#F5F5F5',
    paddingBottom: spacing.md,
    ...shadow.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    paddingHorizontal: spacing.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.sm,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.dark,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EntrevistaAIScreen;
