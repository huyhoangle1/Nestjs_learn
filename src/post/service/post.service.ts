import { PostRepository } from './../repositories/post.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class PostService {

  constructor(private readonly PostRepository: PostRepository,
              private readonly userService: UserService,
    ){}

  async getAllPosts() {
    return this.PostRepository.getByCondition({});
  }

  async getPostById(post_id: string) {
    const post =await this.PostRepository.findById(post_id);
    if (post) {
      return post;
    }else{
      throw new NotFoundException(post_id);
      // throw new PostNotFoundException(post_id);
    }
    // throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(post_id: string, data: UpdatePostDto) {
    return await this.PostRepository.findByIdAndUpdate(post_id, data);
  }

  async createPost(post: CreatePostDto) {
    return await this.PostRepository.create(post);
  }

  async deletePost(post_id: string) {
    return await this.PostRepository.deleteOne(post_id);
  }
}