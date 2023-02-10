import { PostRepository } from './repositories/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { PostController } from './controller/post.controller';
import { PostService } from './service/post.service';
import { PostSchema } from './models/post.model';
import { UserModule } from 'src/user/user.module';
import { CategoryController } from './controller/category.controller';
import { CategorySchema } from './models/category.model';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryService } from './service/category.service';
import { UserSchema } from 'src/user/models/user.model';
import { CreatePostHandler } from './handler/createPost.handler';
import { GetPostHandler } from './handler/getPost.handler';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports:[
    forwardRef(() => UserModule),
    forwardRef(() => CqrsModule),
    MongooseModule.forFeature([
      {
        name: 'Post',
        schema: PostSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
      {
        name: 'User',
        schema: UserSchema,
      },
  ]),
  ],
  controllers: [PostController, CategoryController],
  providers: [    
    PostService,
    PostRepository,
    CategoryRepository,
    CategoryService,
    CreatePostHandler,
    GetPostHandler,
  ]
})
export class PostModule {}
