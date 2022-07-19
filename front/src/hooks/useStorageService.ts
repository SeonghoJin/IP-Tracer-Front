import {useServices} from "./useServices";

export const useStorageService = () => {
    const { storageService } = useServices();

    return storageService;
}
