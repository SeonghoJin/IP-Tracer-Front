import { LogInterceptor } from '../src/interceptor/log.interceptor';

describe('LogInterceptor', () => {
  it('should be defined', () => {
    expect(new LogInterceptor()).toBeDefined();
  });
});
