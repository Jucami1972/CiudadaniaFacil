// src/screens/DemocraciaScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DemocraciaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Principios de la Democracia Americana</Text>
      {/* Aquí irán las tarjetas de estudio o preguntas */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DemocraciaScreen;
