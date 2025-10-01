// src/data/testConciliacion.tsx
// Script de prueba para el sistema de conciliación

import { 
  conciliarPreguntas, 
  generarReporteConciliacion, 
  exportarPreguntasCorregidas,
  validarRespuesta 
} from './conciliacionPreguntas';

// Función para probar la conciliación
export const testConciliacion = () => {
  console.log('🧪 INICIANDO PRUEBAS DE CONCILIACIÓN...\n');
  
  // 1. Ejecutar conciliación completa
  console.log('📋 EJECUTANDO CONCILIACIÓN COMPLETA...');
  const resultados = conciliarPreguntas();
  console.log(`✅ Conciliación completada. ${resultados.length} preguntas analizadas.\n`);
  
  // 2. Generar reporte
  console.log('📊 GENERANDO REPORTE...');
  const reporte = generarReporteConciliacion();
  console.log(reporte);
  
  // 3. Probar validaciones específicas
  console.log('🔍 PROBANDO VALIDACIONES ESPECÍFICAS...\n');
  
  // Ejemplo 1: Pregunta de opción única
  console.log('📝 Ejemplo 1: Pregunta de opción única');
  const pregunta1 = "What is the supreme law of the land?";
  const respuesta1 = "The Constitution";
  const resultado1 = validarRespuesta("The Constitution", respuesta1, pregunta1);
  console.log(`Pregunta: ${pregunta1}`);
  console.log(`Respuesta del usuario: "The Constitution"`);
  console.log(`Resultado: ${resultado1.isCorrect ? '✅ Correcto' : '❌ Incorrecto'}`);
  console.log(`Razón: ${resultado1.reason}\n`);
  
  // Ejemplo 2: Pregunta de opción múltiple
  console.log('📝 Ejemplo 2: Pregunta de opción múltiple');
  const pregunta2 = "What are two rights in the Declaration of Independence?";
  const respuesta2 = "Life, liberty, pursuit of happiness";
  const resultado2 = validarRespuesta("Life, liberty", respuesta2, pregunta2);
  console.log(`Pregunta: ${pregunta2}`);
  console.log(`Respuesta del usuario: "Life, liberty"`);
  console.log(`Resultado: ${resultado2.isCorrect ? '✅ Correcto' : '❌ Incorrecto'}`);
  console.log(`Razón: ${resultado2.reason}\n`);
  
  // Ejemplo 3: Pregunta con respuesta incorrecta
  console.log('📝 Ejemplo 3: Respuesta incorrecta');
  const pregunta3 = "How many amendments does the Constitution have?";
  const respuesta3 = "Twenty-seven";
  const resultado3 = validarRespuesta("Twenty-five", respuesta3, pregunta3);
  console.log(`Pregunta: ${pregunta3}`);
  console.log(`Respuesta del usuario: "Twenty-five"`);
  console.log(`Resultado: ${resultado3.isCorrect ? '✅ Correcto' : '❌ Incorrecto'}`);
  console.log(`Razón: ${resultado3.reason}`);
  console.log(`Sugerencias: ${resultado3.suggestions.join(', ')}\n`);
  
  // 4. Mostrar estadísticas de problemas
  const preguntasConProblemas = resultados.filter(r => r.issues.length > 0);
  console.log('⚠️ RESUMEN DE PROBLEMAS DETECTADOS:');
  console.log(`Total de preguntas con problemas: ${preguntasConProblemas.length}`);
  
  if (preguntasConProblemas.length > 0) {
    console.log('\nPrincipales tipos de problemas:');
    const tiposProblemas = preguntasConProblemas.reduce((acc, r) => {
      r.issues.forEach(issue => {
        acc[issue] = (acc[issue] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);
    
    Object.entries(tiposProblemas)
      .sort(([,a], [,b]) => b - a)
      .forEach(([problema, cantidad]) => {
        console.log(`  - ${problema}: ${cantidad} casos`);
      });
  }
  
  // 5. Exportar preguntas corregidas
  console.log('\n📤 EXPORTANDO PREGUNTAS CORREGIDAS...');
  const preguntasCorregidas = exportarPreguntasCorregidas();
  console.log(`✅ ${preguntasCorregidas.length} preguntas exportadas con metadatos.`);
  
  return {
    resultados,
    reporte,
    preguntasCorregidas,
    estadisticas: {
      total: resultados.length,
      conProblemas: preguntasConProblemas.length,
      sinProblemas: resultados.length - preguntasConProblemas.length
    }
  };
};

// Función para probar casos específicos
export const testCasosEspecificos = () => {
  console.log('🎯 PROBANDO CASOS ESPECÍFICOS...\n');
  
  const casos = [
    {
      pregunta: "What is the supreme law of the land?",
      respuestaCorrecta: "The Constitution",
      respuestasUsuario: ["The Constitution", "constitution", "Constitution", "the constitution"]
    },
    {
      pregunta: "What are two rights in the Declaration of Independence?",
      respuestaCorrecta: "Life, liberty, pursuit of happiness",
      respuestasUsuario: ["Life, liberty", "life and liberty", "Life", "liberty", "pursuit of happiness"]
    },
    {
      pregunta: "Name one branch or part of the government.",
      respuestaCorrecta: "Congress, legislative, President, executive, the courts, judicial",
      respuestasUsuario: ["Congress", "President", "courts", "judicial", "legislative"]
    }
  ];
  
  casos.forEach((caso, index) => {
    console.log(`📝 Caso ${index + 1}: ${caso.pregunta}`);
    console.log(`Respuesta correcta: ${caso.respuestaCorrecta}`);
    
    caso.respuestasUsuario.forEach(respuestaUsuario => {
      const resultado = validarRespuesta(respuestaUsuario, caso.respuestaCorrecta, caso.pregunta);
      const icono = resultado.isCorrect ? '✅' : '❌';
      console.log(`  ${icono} "${respuestaUsuario}" -> ${resultado.isCorrect ? 'Correcto' : 'Incorrecto'}`);
    });
    console.log('');
  });
};

// Función para generar reporte detallado
export const generarReporteDetallado = () => {
  const resultados = conciliarPreguntas();
  
  let reporte = '=== REPORTE DETALLADO DE CONCILIACIÓN ===\n\n';
  
  // Agrupar por categoría
  const porCategoria = resultados.reduce((acc, r) => {
    if (!acc[r.category]) acc[r.category] = [];
    acc[r.category].push(r);
    return acc;
  }, {} as Record<string, typeof resultados>);
  
  Object.entries(porCategoria).forEach(([categoria, preguntas]) => {
    reporte += `📚 CATEGORÍA: ${categoria.toUpperCase()}\n`;
    reporte += `Total preguntas: ${preguntas.length}\n`;
    
    const conProblemas = preguntas.filter(p => p.issues.length > 0);
    const sinProblemas = preguntas.filter(p => p.issues.length === 0);
    
    reporte += `✅ Sin problemas: ${sinProblemas.length}\n`;
    reporte += `⚠️ Con problemas: ${conProblemas.length}\n\n`;
    
    if (conProblemas.length > 0) {
      reporte += `Preguntas con problemas:\n`;
      conProblemas.forEach((pregunta, index) => {
        reporte += `${index + 1}. ID ${pregunta.id}: ${pregunta.question}\n`;
        reporte += `   Respuesta: ${pregunta.answer}\n`;
        reporte += `   Problemas: ${pregunta.issues.join(', ')}\n\n`;
      });
    }
    
    reporte += '─'.repeat(50) + '\n\n';
  });
  
  return reporte;
};

export default {
  testConciliacion,
  testCasosEspecificos,
  generarReporteDetallado
};

