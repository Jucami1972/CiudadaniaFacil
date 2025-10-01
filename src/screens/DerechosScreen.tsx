import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProps } from '../types/navigation';

const DerechosScreen = () => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <View style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={26} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Derechos y Responsabilidades</Text>
      </View>
      <ScrollView style={styles.container}>
        <Text>Aquí van tus tarjetas de C)</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  header: {
    height: Platform.OS === 'ios' ? 120 : 100,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backButton: { position: 'absolute', left: 16 },
  title: { fontSize: 18, fontWeight: 'bold' },
  container: { flex: 1, padding: 16 },
});

export default DerechosScreen;
