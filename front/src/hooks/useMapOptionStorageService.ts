import { useServices } from "./useServices";

export const useMapOptionStorageService = () => {
  const { mapOptionStorageService } = useServices();

  return mapOptionStorageService;
};
