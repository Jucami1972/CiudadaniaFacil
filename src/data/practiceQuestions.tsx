// src/data/practiceQuestions.tsx
// Preguntas de práctica limpias para la aplicación de práctica por categorías
// Sin paréntesis, sin puntos, respuestas simplificadas

export interface PracticeQuestion {
  id: number;
  question: string;
  answer: string;
  category: 'government' | 'history' | 'civics';
  difficulty: 'easy' | 'medium' | 'hard';
  requiredQuantity?: number; // Cantidad de elementos requeridos (1, 2, 3, etc.)
  questionType?: 'single' | 'multiple' | 'choice'; // Tipo de pregunta
}

export const practiceQuestions: PracticeQuestion[] = [
  // GOBIERNO AMERICANO
  {
    id: 1,
    question: "What is the supreme law of the land?",
    answer: "The Constitution",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "What does the Constitution do?",
    answer: "Sets up the government, defines the government, protects basic rights of Americans",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "The idea of self-government is in the first three words of the Constitution. What are these words?",
    answer: "We the People",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 4,
    question: "What is an amendment?",
    answer: "A change or addition to the Constitution",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 5,
    question: "What do we call the first ten amendments to the Constitution?",
    answer: "The Bill of Rights",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "What is one right or freedom from the First Amendment?",
    answer: "Freedom of speech, freedom of religion, freedom of the press, freedom of assembly, freedom to petition the government",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 7,
    question: "How many amendments does the Constitution have?",
    answer: "Twenty-seven",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 8,
    question: "What did the Declaration of Independence do?",
    answer: "Announced our independence from Great Britain, declared our independence from Great Britain, said that the United States is free from Great Britain",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 9,
    question: "What are two rights in the Declaration of Independence?",
    answer: "Life, liberty, pursuit of happiness",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 10,
    question: "What is freedom of religion?",
    answer: "You can practice any religion or not practice a religion",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 11,
    question: "What is the economic system in the United States?",
    answer: "Capitalist economy, market economy",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 12,
    question: "What is the rule of law?",
    answer: "Everyone must follow the law, leaders must obey the law, government must obey the law, no one is above the law",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 13,
    question: "Name one branch or part of the government.",
    answer: "Congress, legislative, President, executive, the courts, judicial",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 14,
    question: "What stops one branch of government from becoming too powerful?",
    answer: "Checks and balances, separation of powers",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 15,
    question: "Who is in charge of the executive branch?",
    answer: "The President",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 16,
    question: "Who makes federal laws?",
    answer: "Congress, Senate and House of Representatives, U.S. or national legislature",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 17,
    question: "What are the two parts of the U.S. Congress?",
    answer: "The Senate and House of Representatives",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 18,
    question: "How many U.S. Senators are there?",
    answer: "One hundred",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 19,
    question: "We elect a U.S. Senator for how many years?",
    answer: "Six",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 20,
    question: "Who is one of your state's U.S. Senators now?",
    answer: "Answers will vary by state",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 21,
    question: "The House of Representatives has how many voting members?",
    answer: "Four hundred thirty-five",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 22,
    question: "We elect a U.S. Representative for how many years?",
    answer: "Two",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 23,
    question: "Name your U.S. Representative.",
    answer: "Answers will vary by district",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 24,
    question: "Who does a U.S. Senator represent?",
    answer: "All people of the state",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 25,
    question: "Why do some states have more Representatives than other states?",
    answer: "Because of the state's population, because they have more people, because some states have more people",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 26,
    question: "We elect a President for how many years?",
    answer: "Four",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 27,
    question: "In what month do we vote for President?",
    answer: "November",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 28,
    question: "What is the name of the President of the United States now?",
    answer: "Joe Biden",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 29,
    question: "What is the name of the Vice President of the United States now?",
    answer: "Kamala Harris",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 30,
    question: "If the President can no longer serve, who becomes President?",
    answer: "The Vice President",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 31,
    question: "If both the President and the Vice President can no longer serve, who becomes President?",
    answer: "The Speaker of the House",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 32,
    question: "Who is the Commander in Chief of the military?",
    answer: "The President",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 33,
    question: "Who signs bills to become laws?",
    answer: "The President",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 34,
    question: "Who vetoes bills?",
    answer: "The President",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 35,
    question: "What does the President's Cabinet do?",
    answer: "Advises the President",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 36,
    question: "What are two Cabinet-level positions?",
    answer: "Secretary of Agriculture, Secretary of Commerce, Secretary of Defense, Secretary of Education, Secretary of Energy, Secretary of Health and Human Services, Secretary of Homeland Security, Secretary of Housing and Urban Development, Secretary of the Interior, Secretary of Labor, Secretary of State, Secretary of Transportation, Secretary of the Treasury, Secretary of Veterans Affairs, Attorney General, Vice President",
    category: "government",
    difficulty: "hard"
  },
  {
    id: 37,
    question: "What does the judicial branch do?",
    answer: "Reviews and explains the laws, resolves disputes, decides if a law goes against the Constitution",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 38,
    question: "What is the highest court in the United States?",
    answer: "The Supreme Court",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 39,
    question: "How many justices are on the Supreme Court?",
    answer: "Nine",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 40,
    question: "Who is the Chief Justice of the United States now?",
    answer: "John Roberts",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 41,
    question: "Under our Constitution, some powers belong to the federal government. What is one power of the federal government?",
    answer: "To print money, to declare war, to create an army, to make treaties",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 42,
    question: "Under our Constitution, some powers belong to the states. What is one power of the states?",
    answer: "Provide schooling and education, provide protection, provide safety, give a driver's license, approve zoning and land use",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 43,
    question: "Who is the Governor of your state now?",
    answer: "Answers will vary by state",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 44,
    question: "What is the capital of your state?",
    answer: "Answers will vary by state",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 45,
    question: "What are the two major political parties in the United States?",
    answer: "Democratic and Republican",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 46,
    question: "What is one responsibility that is only for United States citizens?",
    answer: "Serve on a jury when called, vote in a federal election",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 47,
    question: "What is one right only for United States citizens?",
    answer: "Vote in a federal election, run for federal office",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 48,
    question: "What are two rights of everyone living in the United States?",
    answer: "Freedom of expression, freedom of speech, freedom of assembly, freedom to petition the government, freedom of worship, the right to bear arms",
    category: "government",
    difficulty: "medium"
  },
  {
    id: 49,
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answer: "The United States, the flag",
    category: "government",
    difficulty: "easy"
  },
  {
    id: 50,
    question: "What is one promise you make when you become a United States citizen?",
    answer: "Give up loyalty to other countries, defend the Constitution and laws of the United States, obey the laws of the United States, serve in the U.S. military if needed, serve the nation if needed, be loyal to the United States",
    category: "government",
    difficulty: "medium"
  },

  // HISTORIA AMERICANA
  {
    id: 51,
    question: "What is one reason colonists came to America?",
    answer: "Freedom, political liberty, religious freedom, economic opportunity, practice their religion, escape persecution",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 52,
    question: "Who lived in America before the Europeans arrived?",
    answer: "American Indians, Native Americans",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 53,
    question: "What group of people was taken to America and sold as slaves?",
    answer: "Africans, people from Africa",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 54,
    question: "Why did the colonists fight the British?",
    answer: "Because of high taxes, because the British army stayed in their houses, because they didn't have self-government",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 55,
    question: "Who wrote the Declaration of Independence?",
    answer: "Thomas Jefferson",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 56,
    question: "When was the Declaration of Independence adopted?",
    answer: "July 4, 1776",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 57,
    question: "There were 13 original states. Name three.",
    answer: "New Hampshire, Massachusetts, Rhode Island, Connecticut, New York, New Jersey, Pennsylvania, Delaware, Maryland, Virginia, North Carolina, South Carolina, Georgia",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 58,
    question: "What happened at the Constitutional Convention?",
    answer: "The Constitution was written, the Founding Fathers wrote the Constitution",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 59,
    question: "When was the Constitution written?",
    answer: "1787",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 60,
    question: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers.",
    answer: "James Madison, Alexander Hamilton, John Jay, Publius",
    category: "history",
    difficulty: "hard"
  },
  {
    id: 61,
    question: "What is one thing Benjamin Franklin is famous for?",
    answer: "U.S. diplomat, oldest member of the Constitutional Convention, first Postmaster General of the United States, writer of Poor Richard's Almanac, started the first free libraries",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 62,
    question: "Who is the Father of Our Country?",
    answer: "George Washington",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 63,
    question: "Who was the first President?",
    answer: "George Washington",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 64,
    question: "What territory did the United States buy from France in 1803?",
    answer: "The Louisiana Territory, Louisiana",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 65,
    question: "Name one war fought by the United States in the 1800s.",
    answer: "War of 1812, Mexican-American War, Civil War, Spanish-American War",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 66,
    question: "Name the U.S. war between the North and the South.",
    answer: "The Civil War",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 67,
    question: "Name one problem that led to the Civil War.",
    answer: "Slavery, economic reasons, states' rights",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 68,
    question: "What was one important thing that Abraham Lincoln did?",
    answer: "Freed the slaves, saved the Union, led the United States during the Civil War",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 69,
    question: "What did the Emancipation Proclamation do?",
    answer: "Freed the slaves, freed slaves in the Confederacy, freed slaves in the Confederate states, freed slaves in most Southern states",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 70,
    question: "What did Susan B. Anthony do?",
    answer: "Fought for women's rights, fought for civil rights",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 71,
    question: "Name one war fought by the United States in the 1900s.",
    answer: "World War I, World War II, Korean War, Vietnam War, Gulf War",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 72,
    question: "Who was President during World War I?",
    answer: "Woodrow Wilson",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 73,
    question: "Who was President during the Great Depression and World War II?",
    answer: "Franklin Roosevelt",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 74,
    question: "Who did the United States fight in World War II?",
    answer: "Japan, Germany, and Italy",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 75,
    question: "Before he was President, Eisenhower was a general. What war was he in?",
    answer: "World War II",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 76,
    question: "During the Cold War, what was the main concern of the United States?",
    answer: "Communism",
    category: "history",
    difficulty: "medium"
  },
  {
    id: 77,
    question: "What movement tried to end racial discrimination?",
    answer: "Civil rights movement",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 78,
    question: "What did Martin Luther King, Jr. do?",
    answer: "Fought for civil rights, worked for equality for all Americans",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 79,
    question: "What major event happened on September 11, 2001, in the United States?",
    answer: "Terrorists attacked the United States",
    category: "history",
    difficulty: "easy"
  },
  {
    id: 80,
    question: "Name one American Indian tribe in the United States.",
    answer: "Cherokee, Navajo, Sioux, Chippewa, Choctaw, Pueblo, Apache, Iroquois, Creek, Blackfeet, Seminole, Cheyenne, Arawak, Shawnee, Mohegan, Huron, Oneida, Lakota, Crow, Teton, Hopi, Inuit",
    category: "history",
    difficulty: "hard"
  },

  // EDUCACIÓN CÍVICA
  {
    id: 81,
    question: "Name one of the two longest rivers in the United States.",
    answer: "Missouri River, Mississippi River",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 82,
    question: "What ocean is on the West Coast of the United States?",
    answer: "Pacific Ocean",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 83,
    question: "What ocean is on the East Coast of the United States?",
    answer: "Atlantic Ocean",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 84,
    question: "Name one U.S. territory.",
    answer: "Puerto Rico, U.S. Virgin Islands, American Samoa, Northern Mariana Islands, Guam",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 85,
    question: "Name one state that borders Canada.",
    answer: "Maine, New Hampshire, Vermont, New York, Pennsylvania, Ohio, Michigan, Minnesota, North Dakota, Montana, Idaho, Washington, Alaska",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 86,
    question: "Name one state that borders Mexico.",
    answer: "California, Arizona, New Mexico, Texas",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 87,
    question: "What is the capital of the United States?",
    answer: "Washington, D.C.",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 88,
    question: "Where is the Statue of Liberty?",
    answer: "New York Harbor, Liberty Island",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 89,
    question: "Why does the flag have 13 stripes?",
    answer: "Because there were 13 original colonies, because the stripes represent the original colonies",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 90,
    question: "Why does the flag have 50 stars?",
    answer: "Because there is one star for each state, because each star represents a state, because there are 50 states",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 91,
    question: "What is the name of the national anthem?",
    answer: "The Star-Spangled Banner",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 92,
    question: "When do we celebrate Independence Day?",
    answer: "July 4",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 93,
    question: "Name two national U.S. holidays.",
    answer: "New Year's Day, Martin Luther King, Jr. Day, Presidents' Day, Memorial Day, Independence Day, Labor Day, Columbus Day, Veterans Day, Thanksgiving, Christmas",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 94,
    question: "What is the name of the Speaker of the House of Representatives now?",
    answer: "Mike Johnson",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 95,
    question: "There are four amendments to the Constitution about who can vote. Describe one of them.",
    answer: "Citizens eighteen and older can vote, you don't have to pay a poll tax to vote, any citizen can vote, a male citizen of any race can vote",
    category: "civics",
    difficulty: "hard"
  },
  {
    id: 96,
    question: "What is one responsibility that is only for United States citizens?",
    answer: "Serve on a jury when called, vote in a federal election",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 97,
    question: "What is one right only for United States citizens?",
    answer: "Vote in a federal election, run for federal office",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 98,
    question: "What are two rights of everyone living in the United States?",
    answer: "Freedom of expression, freedom of speech, freedom of assembly, freedom to petition the government, freedom of worship, the right to bear arms",
    category: "civics",
    difficulty: "medium"
  },
  {
    id: 99,
    question: "What do we show loyalty to when we say the Pledge of Allegiance?",
    answer: "The United States, the flag",
    category: "civics",
    difficulty: "easy"
  },
  {
    id: 100,
    question: "What is one promise you make when you become a United States citizen?",
    answer: "Give up loyalty to other countries, defend the Constitution and laws of the United States, obey the laws of the United States, serve in the U.S. military if needed, serve the nation if needed, be loyal to the United States",
    category: "civics",
    difficulty: "medium"
  }
];

// Función para obtener preguntas por categoría
export const getQuestionsByCategory = (category: 'government' | 'history' | 'civics'): PracticeQuestion[] => {
  return getProcessedQuestions().filter(q => q.category === category);
};

// Función para obtener preguntas aleatorias por categoría
export const getRandomQuestionsByCategory = (category: 'government' | 'history' | 'civics', count: number): PracticeQuestion[] => {
  const categoryQuestions = getQuestionsByCategory(category);
  const shuffled = [...categoryQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

// Función para detectar automáticamente la cantidad requerida en una pregunta
export const detectRequiredQuantity = (question: string): number => {
  const lowerQuestion = question.toLowerCase();
  
  // Detectar preguntas que piden múltiples elementos
  if (lowerQuestion.includes('name three') || lowerQuestion.includes('three words')) {
    return 3;
  }
  
  if (lowerQuestion.includes('name two') || lowerQuestion.includes('two rights') || 
      lowerQuestion.includes('two parts') || lowerQuestion.includes('two cabinet') ||
      lowerQuestion.includes('two major') || lowerQuestion.includes('two national')) {
    return 2;
  }
  
  if (lowerQuestion.includes('one of') || lowerQuestion.includes('one reason') ||
      lowerQuestion.includes('one problem') || lowerQuestion.includes('one war') ||
      lowerQuestion.includes('one state') || lowerQuestion.includes('one territory')) {
    return 1;
  }
  
  // Por defecto, solo 1 elemento
  return 1;
};

// Función para detectar el tipo de pregunta
export const detectQuestionType = (question: string, requiredQuantity: number): 'single' | 'multiple' | 'choice' => {
  if (requiredQuantity > 1) {
    return 'multiple';
  }
  
  const lowerQuestion = question.toLowerCase();
  if (lowerQuestion.includes('one of') || lowerQuestion.includes('choose')) {
    return 'choice';
  }
  
  return 'single';
};

// Función para procesar preguntas y agregar metadatos automáticamente
export const getProcessedQuestions = (): PracticeQuestion[] => {
  return practiceQuestions.map(q => ({
    ...q,
    requiredQuantity: detectRequiredQuantity(q.question),
    questionType: detectQuestionType(q.question, detectRequiredQuantity(q.question))
  }));
};

// Función para obtener todas las preguntas aleatorias
export const getAllRandomQuestions = (): PracticeQuestion[] => {
  return getProcessedQuestions().sort(() => Math.random() - 0.5);
};

export default practiceQuestions;
