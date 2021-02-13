import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
  reverseGeocodeAsync,
} from "expo-location";

interface data {
  device_id: string;
  latitude?: number;
  longitude?: number;
  email?: string[];
}

export const LocationService = async () => {
  let { status } = await requestPermissionsAsync();
  if (status !== "granted") {
    return false;
  }

  const location = await getCurrentPositionAsync({});
  const geoLocation = await reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });
  return { location, geoLocation };
};
