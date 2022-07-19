import { useServices } from "./useServices";

export const useCommandService = () => {
  const { commandService } = useServices();
  return commandService;
};
