export const api = {
  ipGeolocationApi: (baseUri: string) => (apiKey: string) => (ip: string) => {
    return `${baseUri}?apiKey=${apiKey}&ip=${ip}`;
  },
  ipStackApi: (baseUri: string) => (apiKey: string) => (ip: string) => {
    return `${baseUri}/${ip}?access_key=${apiKey}`;
  },
  ipApi: (baseUri: string) => (apiKey: string) => (ip: string) => {
    return `${baseUri}/${ip}?access_key=${apiKey}`;
  },
};
