import { PostRepository } from './repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Mongoose, Schema } from 'mongoose';
import { Module } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { PostSchema } from './models/post.model';
import { UserModule } from 'src/user/user.module';
import { CategoryController } from './controller/category.controller';
import { CategorySchema } from './models/category.model';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './service/category.service';

@Module({
    imports:[
    MongooseModule.forFeature([
      {
            name: 'Post',
            schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
  ]),
  UserModule,
  ],
  controllers: [PostController, CategoryController],
  providers: [PostService, PostRepository, CategoryRepository, CategoryService]
})
export class PostModule {}
