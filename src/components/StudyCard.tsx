import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, ViewStyle } from 'react-native';
import * as Progress from 'react-native-progress';
import { LinearGradient } from 'expo-linear-gradient';

// Constantes
const PROGRESS_CIRCLE_SIZE = 60;
const PROGRESS_CIRCLE_THICKNESS = 5;
const DEFAULT_GRADIENT_COLORS = ['#5e13b3', '#460d99'] as [string, string];

// Configuración de sombras por plataforma
const getShadowStyle = (): ViewStyle => {
  if (Platform.OS === 'ios' || Platform.OS === 'web') {
    return {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
    };
  }
  if (Platform.OS === 'android') {
    return {
      elevation: 6,
    };
  }
  return {};
};

type StudyCardProps = {
  title: string;
  description: string;
  progress: number;
  onPress: () => void;
  showProgressOutside?: boolean;
  gradientColors?: [string, string];
  testID?: string;
};

const StudyCard = memo(({ 
  title, 
  description, 
  progress, 
  onPress,
  showProgressOutside = false,
  gradientColors = DEFAULT_GRADIENT_COLORS,
  testID = 'study-card'
}: StudyCardProps) => {
  const formattedProgress = Math.round(progress * 100);
  const accessibilityLabel = `${title} - ${description} - Progress: ${formattedProgress}%`;

  const ProgressCircle = memo(() => (
    <Progress.Circle
      size={PROGRESS_CIRCLE_SIZE}
      thickness={PROGRESS_CIRCLE_THICKNESS}
      progress={progress}
      showsText
      color="#FFE600"
      unfilledColor="rgba(255, 230, 0, 0.77)"
      borderWidth={0}
      formatText={() => `${formattedProgress}%`}
      textStyle={styles.progressText}
      testID={`${testID}-progress`}
    />
  ));

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={0.9}
        accessible={true}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled: false }}
        testID={`${testID}-button`}
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.card, getShadowStyle()]}
        >
          <View style={styles.cardContent}>
            <View style={styles.textContainer}>
              <Text 
                style={styles.title}
                numberOfLines={2}
                testID={`${testID}-title`}
              >
                {title}
              </Text>
              <Text 
                style={styles.description}
                numberOfLines={3}
                testID={`${testID}-description`}
              >
                {description}
              </Text>
            </View>
            {!showProgressOutside && (
              <View style={styles.progressContainer}>
                <ProgressCircle />
              </View>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {showProgressOutside && (
        <View 
          style={[styles.outsideProgressContainer, getShadowStyle()]}
          testID={`${testID}-outside-progress`}
        >
          <ProgressCircle />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  card: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#FFD700',
    opacity: 0.9,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(247, 240, 240, 0.23)',
    borderRadius: 20,
    padding: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  outsideProgressContainer: {
    position: 'absolute',
    right: -20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 4,
  },
});

StudyCard.displayName = 'StudyCard';

export default StudyCard;
