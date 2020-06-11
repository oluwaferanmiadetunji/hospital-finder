const error = () => {
  alert('Location is not enabled');
};
const options = {
  enableHighAccuracy: true,
  maximumAge: 0,
  timeout: 10000
};

const success = (position: {
  coords: { latitude: number; longitude: number; accuracy: any };
}) => {
  return position.coords;
};

export const getLocation = () => {
  navigator.geolocation.watchPosition(success, error, options);
};
