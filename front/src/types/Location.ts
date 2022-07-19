export type Location = {
  ip: string;
  latitude: number;
  longitude: number;
};

export const isLocation = (obj: any): obj is Location => {
  if (!("ip" in obj)) {
    return false;
  }
  if (!("latitude" in obj)) {
    return false;
  }
  if (!("longitude" in obj)) {
    return false;
  }
  if (typeof obj.ip !== "string") {
    return false;
  }
  if (typeof obj.latitude !== "number") {
    return false;
  }
  if (typeof obj.longitude !== "number") {
    return false;
  }
  return true;
};
