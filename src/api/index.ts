import {api} from "./api_uri";
import axios, {AxiosInstance} from "axios"

class ApiService {

    private interceptor: any;
    private axiosInstance : AxiosInstance
    constructor() {
        this.axiosInstance = axios.create();
        this.axiosInstance.interceptors.response.use((response) => {
            return response.data;
        },
        (error) => {
            console.log(error);
        });
    }

    async sendFeedback(feedback: string) {
        console.log(feedback);
        return await this.axiosInstance.post(api.postFeedback, {
            feedback,
        });
    }
}

export const apiService = new ApiService();
