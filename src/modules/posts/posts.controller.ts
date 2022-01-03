import { Controller } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { AbstractController } from '../../abstract/abstract.controller';


@Controller('posts')
export class PostsController extends AbstractController<Post> {

  constructor(private readonly usersService: PostsService) {
    super(usersService);
  }
}
