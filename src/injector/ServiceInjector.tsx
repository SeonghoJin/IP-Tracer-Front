import React from 'react';
import axios from "axios";
import {IpLocationService} from "../service/IpLocationService";
import {EmailService} from "../service/EmailService";
import {HttpService} from "../service/HttpService";
import {config} from "../config";

const httpService: HttpService = axios.create({
    baseURL: config.API_PREFIX
});

export const ServiceContext = React.createContext<{
    ipLocationService: IpLocationService,
    emailService: EmailService,
} | null>(null);

type Props = {
    children: React.ReactNode;
}

export function ServiceInjector({children}: Props){
    return <ServiceContext.Provider value={{
        ipLocationService: new IpLocationService(httpService),
        emailService: new EmailService(httpService)
    }}>
        {children}
    </ServiceContext.Provider>
}
