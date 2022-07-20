import { useServices } from "./useServices";

export const useVisitService = () => {
  const { visitService } = useServices();
  return visitService;
};
