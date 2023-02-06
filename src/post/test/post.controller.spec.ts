import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../controller/post.controller';

describe('PostController', () => {
  // test
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
