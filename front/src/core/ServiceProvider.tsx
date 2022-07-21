import React from "react";
import axios from "axios";
import {
  IIpLocationService,
  IpLocationService,
} from "../service/IpLocationService";
import { EmailService, IEmailService } from "../service/EmailService";
import { HttpService } from "../service/HttpService";
import { config } from "../config";
import {
  IMapOptionStorageService,
  MapOptionStorageService,
} from "../service/MapOptionStorageService";
import {
  ITerminalStorageService,
  TerminalStorageService,
} from "../service/TerminalStorageService";
import { IVisitService, VisitService } from "../service/VisitService";
import {
  IMobileSupportService,
  MobileSupportService,
} from "../service/MobileSupportService";
import { CommandIterator } from "./CommandIterator";

const httpService: HttpService = axios.create({
  baseURL: config.API_PREFIX,
});

const defaultValue = {
  ipLocationService: new IpLocationService(httpService),
  emailService: new EmailService(httpService),
  commandService: new CommandIterator(),
  mapOptionStorageService: new MapOptionStorageService(),
  terminalStorageService: new TerminalStorageService(),
  visitService: new VisitService(),
  mobileSupportService: new MobileSupportService(),
};

export const ServiceContext = React.createContext<{
  ipLocationService: IIpLocationService;
  emailService: IEmailService;
  commandService: CommandIterator;
  mapOptionStorageService: IMapOptionStorageService;
  terminalStorageService: ITerminalStorageService;
  visitService: IVisitService;
  mobileSupportService: IMobileSupportService;
}>(defaultValue);

type Props = {
  children: React.ReactNode;
};

export function ServiceProvider({ children }: Props) {
  return (
    <ServiceContext.Provider value={defaultValue}>
      {children}
    </ServiceContext.Provider>
  );
}
