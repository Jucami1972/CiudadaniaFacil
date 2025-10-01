import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  AccessibilityInfo,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ExplanationRouteProp, NavigationProps } from '../types/navigation';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

interface ExplanationButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

const ExplanationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<ExplanationRouteProp>();
  const { explanationEs, explanationEn, questionTitle } = route.params;

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility('Ventana de explicación abierta');
    return () => {
      AccessibilityInfo.announceForAccessibility('Ventana de explicación cerrada');
    };
  }, []);

  const handleClose = () => {
    navigation.goBack();
  };

  const ModalBackground = Platform.OS === 'ios' ? BlurView : View;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ModalBackground
        style={styles.blur}
        intensity={Platform.OS === 'ios' ? 50 : undefined}
        tint="dark"
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#5637A4', '#9747FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
          >
            <Text 
              style={styles.headerTitle}
              accessibilityRole="header"
            >
              Explicación / Explanation
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleClose}
              accessibilityLabel="Cerrar explicación"
              accessibilityRole="button"
              accessibilityHint="Cierra la ventana de explicación"
            >
              <MaterialCommunityIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            <View style={styles.contentContainer}>
              <View style={styles.questionContainer}>
                <Text 
                  style={styles.questionTitle} 
                  accessibilityRole="header"
                >
                  {questionTitle}
                </Text>
              </View>

              <View style={styles.explanationBox}>
                <Text style={styles.languageLabel}>Español:</Text>
                <Text 
                  style={styles.explanationText}
                  accessibilityLabel={`Explicación en español: ${explanationEs}`}
                >
                  {explanationEs}
                </Text>
              </View>

              <View style={[styles.explanationBox, styles.englishBox]}>
                <Text style={styles.languageLabel}>English:</Text>
                <Text 
                  style={[styles.explanationText, styles.englishText]}
                  accessibilityLabel={`Explanation in English: ${explanationEn}`}
                >
                  {explanationEn}
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </ModalBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: height * 0.85,
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    maxHeight: height * 0.7,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  questionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  explanationBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  englishBox: {
    backgroundColor: '#f8f9fa',
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5637A4',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'justify',
  },
  englishText: {
    fontStyle: 'italic',
    color: '#666',
  },
});

export const ExplanationButton: React.FC<ExplanationButtonProps> = ({ onPress, style }) => (
  <TouchableOpacity
    style={[buttonStyles.explanationButton, style]}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel="Ver explicación"
    accessibilityHint="Muestra una explicación detallada"
  >
    <MaterialCommunityIcons
      name="information"
      size={24}
      color="white"
    />
  </TouchableOpacity>
);

const buttonStyles = StyleSheet.create({
  explanationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5637A4',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});

export default ExplanationScreen;
