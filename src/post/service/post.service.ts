import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { PostRepository } from '../repositories/post.repository';
import { PostNotFoundException } from '../exceptions/postNotFound.exception';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/models/user.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userService: UserService,
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async getAllPosts() {
    return this.postRepository.getByCondition({});
  }

  async getPostById(post_id: string) {
    const post = await this.postRepository.findById(post_id);

    if (post) {
      await post
        .populate({ path: 'user', select: 'name email' })
        .execPopulate();
      return post;
    } else {
      throw new NotFoundException(post_id);
      // throw new PostNotFoundException(post_id);
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return await this.postRepository.findByIdAndUpdate(post_id, data);
  }

  async getByArray() {
    return await this.postRepository.getByCondition({
      // 'numbers.0': { $eq: 10 },
      // numbers: { $elemMatch: { $gt: 13, $lt: 20 } },
      // numbers: { $gt: 13, $lt: 20 }, // hơn 13 nhỏ 20
      // $and: [{ numbers: { $gt: 13 } }, { numbers: { $lt: 20 } }],
      // tags: 'black',
      // tags: { $all: ['black', 'blank'] }, // tồn tại
      // tags: ['red', 'blank'], // No
      // tags: ['red', 'blank', 'black'], //Yes
      // tags: { $size: 3 }, // tab nhiều hơn 2
      tags: { $exists: false }, // kh có tab thì lấy yes ngc lại
    });
  }

  async createPost(user: User, post: CreatePostDto) {
    post.user = user._id;
    const new_post = await this.postRepository.create(post);
    if (post.categories) {
      await this.categoryRepository.updateMany(
        {
          _id: { $in: post.categories },
        },
        {
          $push: {
            posts: new_post._id,
          },
        },
      );
    }
    return new_post;
  }

  async getByCategory(category_id: string) {
    return await this.postRepository.getByCondition({
      categories: {
        $elemMatch: { $eq: category_id },
      },
    });
  }

  async getByCategories(category_ids: [string]) {
    return await this.postRepository.getByCondition({
      categories: {
        $all: category_ids,
      },
    });
  }

  async deletePost(post_id: string) {
    return await this.postRepository.deleteOne(post_id);
  }
}