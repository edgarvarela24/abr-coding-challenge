/**
 * Groups fish by their NOAA region
 * @param {Array} fishData - Array of all fish
 * @returns {Object} Fish grouped by region name
 */
export const groupFishByRegion = (fishData) => {
  return fishData.reduce((acc, fish) => {
    const region = fish.NOAAFisheriesRegion;
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(fish);
    return acc;
  }, {});
};

/**
 * Calculates average calories for an array of fish
 * @param {Array} fishData - Array of fish objects
 * @returns {number} Average calories per serving
 */
export const calculateAverageCalories = (fishData) => {
  const validCalories = fishData
    .filter((fish) => fish.Calories && fish.Calories !== 'null')
    .map((fish) => parseFloat(fish.Calories));

  if (validCalories.length === 0) {
    return 0;
  }

  const sum = validCalories.reduce((acc, calories) => acc + calories, 0);
  return sum / validCalories.length;
};

/**
 * Calculates average fat for an array of fish
 * @param {Array} fishData - Array of fish objects
 * @returns {number} Average fat in grams per serving
 */
export const calculateAverageFat = (fishData) => {
  const validFat = fishData
    .filter((fish) => fish.FatTotal && fish.FatTotal !== 'null')
    .map((fish) => parseFloat(fish.FatTotal));

  if (validFat.length === 0) {
    return 0;
  }
  const sum = validFat.reduce((acc, fat) => acc + fat, 0);
  return sum / validFat.length;
};

/**
 * Gets all unique regions from fish data
 * @param {Array} fishData - Array of all fish
 * @returns {Array} Array of unique region names
 */
export const getUniqueRegions = (fishData) => {
  return [...new Set(fishData.map((fish) => fish.NOAAFisheriesRegion))];
};

/**
 * Calculates statistics for each region
 * @param {Object} groupedFish - Fish grouped by region (from
groupFishByRegion)
 * @returns {Array} Array of region objects with name,
avgCalories, avgFat, fishCount
 */
export const calculateRegionStats = (groupedFish) => {
  return Object.entries(groupedFish).map(([regionName, fishData]) => {
    return {
      name: regionName,
      avgCalories: calculateAverageCalories(fishData),
      avgFat: calculateAverageFat(fishData),
      fishCount: fishData.length,
    };
  });
};

/**
 * Filters fish by region
 * @param {Array} fishData - Array of all fish
 * @param {string} regionName - Name of region to filter by
 * @returns {Array} Fish from specified region
 */
export const getFishByRegion = (fishData, regionName) => {
  return fishData.filter((fish) => fish.NOAAFisheriesRegion === regionName);
};
