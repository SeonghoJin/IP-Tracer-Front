import { Test } from '@nestjs/testing';
import { EmailService } from '../modules/email/email.service';
import { FeedBackConfig } from '../config/feedback.config';
import { ConfigType } from '@nestjs/config';
import { AppService } from './app.service';

type MockType<T = any> = Partial<Record<keyof T, jest.Mock>>;

const mockConfig: ConfigType<typeof FeedBackConfig> = {
  sender: 'test@naver.com',
  receiver: 'test@naver.com',
};

describe('AppService', () => {
  let emailService: MockType<EmailService>;
  let feedbackConfig: ConfigType<typeof FeedBackConfig>;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AppService],
    })
      .useMocker((token) => {
        if (token === FeedBackConfig.KEY) {
          return mockConfig;
        }
        if (token === EmailService) {
          return {
            send: jest.fn(),
          } as MockType<EmailService>;
        }
      })
      .compile();

    emailService = moduleRef.get(EmailService);
    feedbackConfig = moduleRef.get(FeedBackConfig.KEY);
    appService = moduleRef.get(AppService);
  });

  it('should be defined', () => {
    expect(emailService).toBeDefined();
    expect(feedbackConfig).toBeDefined();
    expect(appService).toBeDefined();
  });
});
