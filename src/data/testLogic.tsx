// Archivo de prueba para la lógica de detección de cantidad requerida
import { detectRequiredQuantity, detectQuestionType } from './practiceQuestions';

// Función de prueba
export const testDetectionLogic = () => {
  const testQuestions = [
    "What are two rights in the Declaration of Independence?",
    "There were 13 original states. Name three.",
    "Name one of the two longest rivers in the United States.",
    "What is the capital of the United States?",
    "What are the two parts of the U.S. Congress?",
    "Name two national U.S. holidays."
  ];

  console.log('=== TESTING DETECTION LOGIC ===');
  
  testQuestions.forEach((question, index) => {
    const quantity = detectRequiredQuantity(question);
    const type = detectQuestionType(question, quantity);
    
    console.log(`Question ${index + 1}: "${question}"`);
    console.log(`  Required Quantity: ${quantity}`);
    console.log(`  Question Type: ${type}`);
    console.log('---');
  });
  
  console.log('=== END TEST ===');
};

export default testDetectionLogic;

