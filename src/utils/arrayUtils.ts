/**
 * Shuffles an array using Fisher-Yates algorithm
 * @param array The array to shuffle
 * @returns A new shuffled array
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Gets a specified number of random items from an array
 * @param array The source array
 * @param count Number of items to get
 * @returns Array of random items
 */
export const getRandomItems = <T>(array: T[], count: number): T[] => {
  if (count >= array.length) return shuffleArray(array);
  return shuffleArray(array).slice(0, count);
}; 