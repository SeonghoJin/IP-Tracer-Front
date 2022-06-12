import {HttpService} from "./HttpService";

export class EmailService {

    constructor(
        private httpService: HttpService
    ) {}

    async sendEmail(feedback: string){
        await this.httpService.post('/user-feedback', {
            feedback
        });
    }
}
