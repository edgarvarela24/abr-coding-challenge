const API_URL = 'http://localhost:5001/gofish?apikey=abrradiology';

export const fetchFishData = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch fish data');
  }
  const fishData = await response.json();
  return fishData;
};
