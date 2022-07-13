import { useServices } from "./useServices";

export const useEmailService = () => {
  const { emailService } = useServices();
  return emailService;
};
