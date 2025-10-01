// src/data/conciliacionPreguntas.tsx
// Sistema de conciliación para verificar y corregir preguntas y respuestas

import { practiceQuestions } from './practiceQuestions';

export interface ConciliacionResult {
  id: number;
  question: string;
  answer: string;
  category: string;
  questionType: 'single' | 'multiple' | 'choice';
  requiredQuantity: number;
  issues: string[];
  suggestions: string[];
}

// Función para detectar el tipo de pregunta basado en el texto
export const detectQuestionType = (question: string): 'single' | 'multiple' | 'choice' => {
  const questionLower = question.toLowerCase();
  
  // Preguntas que requieren múltiples respuestas
  if (questionLower.includes('name two') || 
      questionLower.includes('name three') || 
      questionLower.includes('what are two') ||
      questionLower.includes('what are three') ||
      questionLower.includes('list two') ||
      questionLower.includes('list three') ||
      questionLower.includes('give two') ||
      questionLower.includes('give three')) {
    return 'multiple';
  }
  
  // Preguntas de opción única
  if (questionLower.includes('what is') || 
      questionLower.includes('who is') || 
      questionLower.includes('when was') ||
      questionLower.includes('where is') ||
      questionLower.includes('how many') ||
      questionLower.includes('which') ||
      questionLower.includes('what does') ||
      questionLower.includes('what did')) {
    return 'single';
  }
  
  // Preguntas de elección
  if (questionLower.includes('one of') || 
      questionLower.includes('choose') ||
      questionLower.includes('select')) {
    return 'choice';
  }
  
  return 'single'; // Por defecto
};

// Función para detectar la cantidad requerida
export const detectRequiredQuantity = (question: string): number => {
  const questionLower = question.toLowerCase();
  
  if (questionLower.includes('three') || questionLower.includes('3')) return 3;
  if (questionLower.includes('two') || questionLower.includes('2')) return 2;
  if (questionLower.includes('one') || questionLower.includes('1')) return 1;
  
  return 1; // Por defecto
};

// Función para analizar respuestas múltiples
export const analyzeMultipleAnswers = (answer: string): {
  answerCount: number;
  isConsistent: boolean;
  suggestions: string[];
} => {
  const answers = answer.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
  const answerCount = answers.length;
  
  const suggestions: string[] = [];
  let isConsistent = true;
  
  // Verificar si la cantidad de respuestas coincide con el patrón de la pregunta
  if (answerCount > 1) {
    suggestions.push(`Esta pregunta tiene ${answerCount} respuestas posibles. Considera si realmente se necesitan todas.`);
    
    // Verificar si hay respuestas muy similares
    for (let i = 0; i < answers.length; i++) {
      for (let j = i + 1; j < answers.length; j++) {
        if (answers[i].toLowerCase() === answers[j].toLowerCase()) {
          suggestions.push(`Respuesta duplicada detectada: "${answers[i]}"`);
          isConsistent = false;
        }
      }
    }
  }
  
  return { answerCount, isConsistent, suggestions };
};

// Función principal de conciliación
export const conciliarPreguntas = (): ConciliacionResult[] => {
  const resultados: ConciliacionResult[] = [];
  
  practiceQuestions.forEach((question) => {
    const questionType = detectQuestionType(question.question);
    const requiredQuantity = detectRequiredQuantity(question.question);
    const answerAnalysis = analyzeMultipleAnswers(question.answer);
    
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    // Verificar consistencia entre tipo de pregunta y respuestas
    if (questionType === 'single' && answerAnalysis.answerCount > 1) {
      issues.push('Pregunta de opción única pero con múltiples respuestas');
      suggestions.push('Considera mantener solo una respuesta o cambiar el tipo de pregunta');
    }
    
    if (questionType === 'multiple' && answerAnalysis.answerCount < 2) {
      issues.push('Pregunta de opción múltiple pero con menos de 2 respuestas');
      suggestions.push('Agrega más opciones de respuesta o cambia el tipo de pregunta');
    }
    
    // Verificar si la cantidad requerida coincide con las respuestas
    if (requiredQuantity > 1 && answerAnalysis.answerCount < requiredQuantity) {
      issues.push(`Se requieren ${requiredQuantity} respuestas pero solo hay ${answerAnalysis.answerCount}`);
      suggestions.push(`Agrega más opciones para cumplir con el requisito de ${requiredQuantity} respuestas`);
    }
    
    // Agregar sugerencias del análisis de respuestas
    suggestions.push(...answerAnalysis.suggestions);
    
    // Verificar si hay inconsistencias
    if (!answerAnalysis.isConsistent) {
      issues.push('Inconsistencias detectadas en las respuestas');
    }
    
    resultados.push({
      id: question.id,
      question: question.question,
      answer: question.answer,
      category: question.category,
      questionType,
      requiredQuantity,
      issues,
      suggestions
    });
  });
  
  return resultados;
};

// Función para generar reporte de conciliación
export const generarReporteConciliacion = (): string => {
  const resultados = conciliarPreguntas();
  
  let reporte = '=== REPORTE DE CONCILIACIÓN DE PREGUNTAS ===\n\n';
  
  // Estadísticas generales
  const totalPreguntas = resultados.length;
  const preguntasConProblemas = resultados.filter(r => r.issues.length > 0).length;
  const preguntasSinProblemas = totalPreguntas - preguntasConProblemas;
  
  reporte += `📊 ESTADÍSTICAS GENERALES:\n`;
  reporte += `Total de preguntas: ${totalPreguntas}\n`;
  reporte += `Preguntas sin problemas: ${preguntasSinProblemas}\n`;
  reporte += `Preguntas con problemas: ${preguntasConProblemas}\n\n`;
  
  // Preguntas con problemas
  if (preguntasConProblemas > 0) {
    reporte += `⚠️ PREGUNTAS CON PROBLEMAS:\n\n`;
    
    resultados.filter(r => r.issues.length > 0).forEach((resultado, index) => {
      reporte += `${index + 1}. ID: ${resultado.id} (${resultado.category})\n`;
      reporte += `   Pregunta: ${resultado.question}\n`;
      reporte += `   Respuesta: ${resultado.answer}\n`;
      reporte += `   Tipo: ${resultado.questionType}\n`;
      reporte += `   Cantidad requerida: ${resultado.requiredQuantity}\n`;
      reporte += `   Problemas: ${resultado.issues.join(', ')}\n`;
      reporte += `   Sugerencias: ${resultado.suggestions.join('; ')}\n\n`;
    });
  }
  
  // Preguntas sin problemas
  if (preguntasSinProblemas > 0) {
    reporte += `✅ PREGUNTAS SIN PROBLEMAS: ${preguntasSinProblemas}\n\n`;
  }
  
  // Resumen de tipos de pregunta
  const tiposPregunta = resultados.reduce((acc, r) => {
    acc[r.questionType] = (acc[r.questionType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  reporte += `📋 DISTRIBUCIÓN POR TIPO:\n`;
  Object.entries(tiposPregunta).forEach(([tipo, cantidad]) => {
    reporte += `${tipo}: ${cantidad} preguntas\n`;
  });
  
  return reporte;
};

// Función para exportar preguntas corregidas
export const exportarPreguntasCorregidas = (): any[] => {
  const resultados = conciliarPreguntas();
  
  return practiceQuestions.map((question, index) => {
    const resultado = resultados.find(r => r.id === question.id);
    
    return {
      ...question,
      questionType: resultado?.questionType || 'single',
      requiredQuantity: resultado?.requiredQuantity || 1,
      metadata: {
        hasIssues: (resultado?.issues?.length || 0) > 0,
        issues: resultado?.issues || [],
        suggestions: resultado?.suggestions || []
      }
    };
  });
};

// Función para validar una respuesta específica
export const validarRespuesta = (
  userAnswer: string, 
  correctAnswer: string, 
  questionText: string
): {
  isCorrect: boolean;
  reason: string;
  suggestions: string[];
} => {
  const questionType = detectQuestionType(questionText);
  const requiredQuantity = detectRequiredQuantity(questionText);
  
  const userNorm = userAnswer.toLowerCase().trim();
  const correctOptions = correctAnswer.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
  
  // Para preguntas de opción única
  if (questionType === 'single') {
    for (const option of correctOptions) {
      if (userNorm === option.toLowerCase()) {
        return {
          isCorrect: true,
          reason: `Respuesta correcta: "${option}"`,
          suggestions: []
        };
      }
    }
    
    return {
      isCorrect: false,
      reason: `Respuesta incorrecta. Opciones válidas: ${correctOptions.join(', ')}`,
      suggestions: ['Verifica la ortografía', 'Asegúrate de usar la respuesta exacta']
    };
  }
  
  // Para preguntas de opción múltiple
  if (questionType === 'multiple') {
    const userAnswers = userNorm.split(',').map(opt => opt.trim()).filter(opt => opt.length > 0);
    let correctCount = 0;
    
    for (const userAns of userAnswers) {
      for (const correctOpt of correctOptions) {
        if (userAns === correctOpt.toLowerCase()) {
          correctCount++;
          break;
        }
      }
    }
    
    if (correctCount > 0) {
      return {
        isCorrect: true,
        reason: `Correcto: ${correctCount} de ${userAnswers.length} respuestas son válidas`,
        suggestions: [`Puedes agregar más respuestas de: ${correctOptions.join(', ')}`]
      };
    }
    
    return {
      isCorrect: false,
      reason: `Ninguna respuesta es correcta. Opciones válidas: ${correctOptions.join(', ')}`,
      suggestions: ['Verifica cada respuesta individualmente', 'Asegúrate de usar las respuestas exactas']
    };
  }
  
  // Para preguntas de elección
  if (questionType === 'choice') {
    for (const option of correctOptions) {
      if (userNorm === option.toLowerCase()) {
        return {
          isCorrect: true,
          reason: `Opción correcta seleccionada: "${option}"`,
          suggestions: []
        };
      }
    }
    
    return {
      isCorrect: false,
      reason: `Opción incorrecta. Opciones válidas: ${correctOptions.join(', ')}`,
      suggestions: ['Selecciona una de las opciones disponibles']
    };
  }
  
  return {
    isCorrect: false,
    reason: 'Tipo de pregunta no reconocido',
    suggestions: ['Contacta al administrador del sistema']
  };
};

export default {
  conciliarPreguntas,
  generarReporteConciliacion,
  exportarPreguntasCorregidas,
  validarRespuesta,
  detectQuestionType,
  detectRequiredQuantity
};
