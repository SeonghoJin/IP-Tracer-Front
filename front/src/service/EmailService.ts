import { HttpService } from "./HttpService";

export interface IEmailService {
  sendEmail: (feedback: string) => Promise<void>;
}

export class EmailService implements IEmailService{
  constructor(private httpService: HttpService) {}

  sendEmail = async (feedback: string) => {
    await this.httpService.post("/user-feedback", {
      feedback,
    });
  };
}
