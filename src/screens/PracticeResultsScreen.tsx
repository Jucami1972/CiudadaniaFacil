import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface PracticeResultsScreenProps {
  route: {
    params: {
      score: number;
      total: number;
      category: string;
      title: string;
    };
  };
  navigation: any;
}

const PracticeResultsScreen: React.FC<PracticeResultsScreenProps> = ({ route, navigation }) => {
  const { score, total, category, title } = route.params;
  const percentage = Math.round((score / total) * 100);
  const isPassing = percentage >= 60;

  const getScoreColor = (): [string, string] => {
    if (percentage >= 80) return ['#4CAF50', '#388E3C']; // Verde
    if (percentage >= 60) return ['#FF9800', '#F57C00']; // Naranja
    return ['#F44336', '#D32F2F']; // Rojo
  };

  const getScoreMessage = (): string => {
    if (percentage >= 90) return '¡Excelente trabajo!';
    if (percentage >= 80) return '¡Muy bien hecho!';
    if (percentage >= 70) return '¡Buen trabajo!';
    if (percentage >= 60) return '¡Pasaste!';
    return 'Necesitas más práctica';
  };

  const getScoreIcon = (): string => {
    if (percentage >= 80) return 'trophy';
    if (percentage >= 60) return 'check-circle';
    return 'alert-circle';
  };

  const handleRetry = () => {
    navigation.navigate('CategoryPractice', {
      category,
      title
    });
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  const handleViewExplanation = () => {
    // Aquí podrías navegar a una pantalla que muestre todas las preguntas con explicaciones
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resultados de Práctica</Text>
        <Text style={styles.headerSubtitle}>{title}</Text>
      </View>

      <View style={styles.content}>
        {/* Tarjeta de puntaje principal */}
        <View style={styles.scoreCard}>
          <LinearGradient
            colors={getScoreColor()}
            style={styles.scoreGradient}
          >
            <View style={styles.scoreIconContainer}>
              <MaterialCommunityIcons 
                name={getScoreIcon() as any} 
                size={80} 
                color="white" 
              />
            </View>
            
            <Text style={styles.scoreTitle}>{getScoreMessage()}</Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreDivider}>/</Text>
              <Text style={styles.totalNumber}>{total}</Text>
            </View>
            
            <Text style={styles.percentageText}>{percentage}%</Text>
            
            <View style={styles.passIndicator}>
              <MaterialCommunityIcons 
                name={isPassing ? "check-circle" : "close-circle"} 
                size={24} 
                color="white" 
              />
              <Text style={styles.passText}>
                {isPassing ? '¡Aprobado!' : 'No aprobado'}
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Estadísticas detalladas */}
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="check-circle" size={24} color="#4CAF50" />
              <Text style={styles.statLabel}>Correctas</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>
            
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="close-circle" size={24} color="#F44336" />
              <Text style={styles.statLabel}>Incorrectas</Text>
              <Text style={styles.statValue}>{total - score}</Text>
            </View>
          </View>
          
          <View style={styles.statRow}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="percent" size={24} color="#2196F3" />
              <Text style={styles.statLabel}>Precisión</Text>
              <Text style={styles.statValue}>{percentage}%</Text>
            </View>
            
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="target" size={24} color="#FF9800" />
              <Text style={styles.statLabel}>Meta</Text>
              <Text style={styles.statValue}>60%</Text>
            </View>
          </View>
        </View>

        {/* Botones de acción */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={handleRetry}
          >
            <LinearGradient
              colors={['#2196F3', '#1976D2']}
              style={styles.buttonGradient}
            >
              <MaterialCommunityIcons name="refresh" size={24} color="white" />
              <Text style={styles.buttonText}>Intentar de Nuevo</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.explanationButton}
            onPress={handleViewExplanation}
          >
            <LinearGradient
              colors={['#4CAF50', '#388E3C']}
              style={styles.buttonGradient}
            >
              <MaterialCommunityIcons name="book-open-variant" size={24} color="white" />
              <Text style={styles.buttonText}>Ver Explicaciones</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeButton}
            onPress={handleGoHome}
          >
            <LinearGradient
              colors={['#9C27B0', '#7B1FA2']}
              style={styles.buttonGradient}
            >
              <MaterialCommunityIcons name="home" size={24} color="white" />
              <Text style={styles.buttonText}>Ir al Inicio</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Mensaje motivacional */}
        <View style={styles.motivationalContainer}>
          <MaterialCommunityIcons 
            name="lightbulb-on" 
            size={32} 
            color="#FFC107" 
          />
          <Text style={styles.motivationalText}>
            {percentage >= 80 
              ? '¡Sigues demostrando un excelente conocimiento!'
              : percentage >= 60
              ? '¡Bien hecho! Continúa practicando para mejorar.'
              : 'No te desanimes, cada error es una oportunidad de aprendizaje.'
            }
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  scoreCard: {
    marginBottom: 24,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  scoreGradient: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  scoreIconContainer: {
    marginBottom: 16,
  },
  scoreTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  scoreNumber: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreDivider: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  totalNumber: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  percentageText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  passIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  passText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statsContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButtons: {
    marginBottom: 24,
  },
  retryButton: {
    marginBottom: 12,
  },
  explanationButton: {
    marginBottom: 12,
  },
  homeButton: {
    marginBottom: 12,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  motivationalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  motivationalText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export default PracticeResultsScreen;
