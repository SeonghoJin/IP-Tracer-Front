import { HttpService } from "./HttpService";

export class EmailService {
    constructor(private httpService: HttpService) {}

    sendEmail = async (feedback: string) => {
        await this.httpService.post("/user-feedback", {
            feedback,
        });
    };
}
