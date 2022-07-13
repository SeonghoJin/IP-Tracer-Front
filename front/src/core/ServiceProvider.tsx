import React from "react";
import axios from "axios";
import { IpLocationService } from "../service/IpLocationService";
import { EmailService } from "../service/EmailService";
import { HttpService } from "../service/HttpService";
import { config } from "../config";
import {CommandIterator} from "./CommandIterator";

const httpService: HttpService = axios.create({
  baseURL: config.API_PREFIX,
});

const defaultValue = {
    ipLocationService: new IpLocationService(httpService),
    emailService: new EmailService(httpService),
    commandService: new CommandIterator(),
}

export const ServiceContext = React.createContext<{
  ipLocationService: IpLocationService;
  emailService: EmailService;
  commandService: CommandIterator;
}>(defaultValue);

type Props = {
  children: React.ReactNode;
};

export function ServiceProvider({ children }: Props) {
  return (
    <ServiceContext.Provider
      value={defaultValue}
    >
      {children}
    </ServiceContext.Provider>
  );
}
