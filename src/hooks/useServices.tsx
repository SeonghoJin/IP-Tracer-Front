import * as React from "react";
import { ServiceContext } from "../injector/ServiceInjector";

export const useServices = () => {
  const services = React.useContext(ServiceContext);

  if (services === null || services === undefined) {
    throw new Error("ServiceContext not found");
  }

  return services;
};
