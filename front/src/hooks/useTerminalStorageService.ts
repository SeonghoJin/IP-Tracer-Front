import { useServices } from "./useServices";

export const useTerminalStorageService = () => {
  const { terminalStorageService } = useServices();
  return terminalStorageService;
};
