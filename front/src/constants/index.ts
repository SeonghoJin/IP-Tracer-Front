export enum RouteSocketSendEvent {
  requestFindDomain = "requestFindDomain",
}

export enum RouteSocketReceiveEvent {
  hop = "hop",
  findDestination = "findDestination",
  destination = "destination",
  rawMessage = "rawMessage",
}

export const PIXEL_MIN_SIZE = 2;
export const PIXEL_MAX_SIZE = 20;
export const PIXEL_MIN_GAP_SIZE = 1;
export const PIXEL_MAX_GAP_SIZE = 10;

export enum OptionTerminalViewTypes {
  Background = "배경",
  Dot = "점",
  DotColor = "점 색상",
}

export const TOAST_TIME_INTERVAL_SHORT = 2000;
export const TOAST_TIME_INTERVAL_LONG = 4000;
export const API_NAME_MAP: Record<string, string> = {
  'stack-api': 'STACK API',
    'ip-api': 'IP API',
  'geolocation-api': 'GEOLOCATION API',
};
