export enum RouteSocketSendEvent {
  requestFindDomain = "requestFindDomain",
}

export enum RouteSocketReceiveEvent {
  hop = "hop",
  findDestination = "findDestination",
  destination = "destination",
  rawMessage = "rawMessage",
}
