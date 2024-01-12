// Замените YOUR_GOOGLE_MAPS_API_KEY на ваш ключ API

// Функция для выполнения запроса к Google Maps Geocoding API
async function getCoordinates(address) {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_KEY}`
    );
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      return "NotFound";
    }
  } catch (error) {
    return "NotFound";
  }
}

export default getCoordinates;
