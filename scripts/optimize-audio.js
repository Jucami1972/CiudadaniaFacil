#!/usr/bin/env node

/**
 * Script para optimizar archivos de audio MP3
 * Reduce el tamaño de archivos manteniendo calidad para voz
 * 
 * Requisitos:
 * npm install -g ffmpeg-static
 * 
 * Uso:
 * node scripts/optimize-audio.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const QUESTIONS_DIR = path.join(__dirname, '../src/assets/audio/questions');
const ANSWERS_DIR = path.join(__dirname, '../src/assets/audio/answers');
const OUTPUT_DIR = path.join(__dirname, '../src/assets/audio/optimized');

// Configuración de optimización
const OPTIMIZATION_SETTINGS = {
  questions: {
    // Para preguntas (más cortas)
    bitrate: '64k',
    sampleRate: '22050',
    channels: '1', // Mono
    codec: 'mp3'
  },
  answers: {
    // Para respuestas (pueden ser más largas)
    bitrate: '96k', 
    sampleRate: '22050',
    channels: '1', // Mono
    codec: 'mp3'
  }
};

function createOptimizedDirectory() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(path.join(OUTPUT_DIR, 'questions'))) {
    fs.mkdirSync(path.join(OUTPUT_DIR, 'questions'), { recursive: true });
  }
  if (!fs.existsSync(path.join(OUTPUT_DIR, 'answers'))) {
    fs.mkdirSync(path.join(OUTPUT_DIR, 'answers'), { recursive: true });
  }
}

function optimizeAudioFiles(inputDir, outputDir, settings) {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.mp3'));
  
  console.log(`Optimizando ${files.length} archivos en ${inputDir}...`);
  
  files.forEach(file => {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      // Comando FFmpeg para optimización
      const command = [
        'ffmpeg',
        '-i', `"${inputPath}"`,
        '-codec:a', settings.codec,
        '-b:a', settings.bitrate,
        '-ar', settings.sampleRate,
        '-ac', settings.channels,
        '-y', // Sobrescribir archivo de salida
        `"${outputPath}"`
      ].join(' ');
      
      execSync(command, { stdio: 'pipe' });
      
      // Mostrar comparación de tamaños
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✅ ${file}: ${(originalSize/1024).toFixed(1)}KB → ${(optimizedSize/1024).toFixed(1)}KB (${reduction}% reducción)`);
      
    } catch (error) {
      console.error(`❌ Error optimizando ${file}:`, error.message);
    }
  });
}

function generateOptimizedMaps() {
  // Generar mapas optimizados para questions
  const questionsContent = `// ✅ src/assets/audio/optimized/questions/questionsMap.ts
// Archivos de audio optimizados para preguntas

export const questionAudioMapOptimized: { [key: number]: any } = {
${Array.from({length: 100}, (_, i) => `  ${i + 1}: require('./q${String(i + 1).padStart(3, '0')}_question.mp3'),`).join('\n')}
};`;

  // Generar mapas optimizados para answers  
  const answersContent = `// ✅ src/assets/audio/optimized/answers/answersMap.ts
// Archivos de audio optimizados para respuestas

export const answerAudioMapOptimized: { [key: number]: any } = {
${Array.from({length: 100}, (_, i) => `  ${i + 1}: require('./q${String(i + 1).padStart(3, '0')}_answer.mp3'),`).join('\n')}
};`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'questions', 'questionsMap.ts'), questionsContent);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'answers', 'answersMap.ts'), answersContent);
  
  console.log('✅ Mapas de archivos optimizados generados');
}

function main() {
  console.log('🎵 Iniciando optimización de archivos de audio...\n');
  
  try {
    // Verificar que FFmpeg esté disponible
    execSync('ffmpeg -version', { stdio: 'pipe' });
  } catch (error) {
    console.error('❌ FFmpeg no está instalado. Instálalo con: npm install -g ffmpeg-static');
    process.exit(1);
  }
  
  createOptimizedDirectory();
  
  // Optimizar preguntas
  optimizeAudioFiles(QUESTIONS_DIR, path.join(OUTPUT_DIR, 'questions'), OPTIMIZATION_SETTINGS.questions);
  
  // Optimizar respuestas  
  optimizeAudioFiles(ANSWERS_DIR, path.join(OUTPUT_DIR, 'answers'), OPTIMIZATION_SETTINGS.answers);
  
  // Generar mapas optimizados
  generateOptimizedMaps();
  
  console.log('\n🎉 Optimización completada!');
  console.log('📁 Archivos optimizados guardados en: src/assets/audio/optimized/');
  console.log('💡 Para usar los archivos optimizados, actualiza las importaciones en tus componentes.');
}

if (require.main === module) {
  main();
}

