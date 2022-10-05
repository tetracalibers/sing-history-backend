import { Test, TestingModule } from '@nestjs/testing';
import { SetlistResolver } from './setlist.resolver';

describe('SetlistResolver', () => {
  let resolver: SetlistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SetlistResolver],
    }).compile();

    resolver = module.get<SetlistResolver>(SetlistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
