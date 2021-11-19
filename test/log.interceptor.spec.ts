import { LogInterceptor } from '../src/log.interceptor';

describe('LogInterceptor', () => {
  it('should be defined', () => {
    expect(new LogInterceptor()).toBeDefined();
  });
});
