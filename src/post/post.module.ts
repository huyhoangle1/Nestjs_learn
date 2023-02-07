import { PostRepository } from './repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose, Schema } from 'mongoose';
import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { PostSchema } from './models/post.model';

@Module({
    imports:[MongooseModule.forFeature([
      {
            name: 'Post',
            schema: PostSchema,
      }
  ])],
  controllers: [PostController],
  providers: [PostService, PostRepository]
})
export class PostModule {}
