import { Injectable } from '@nestjs/common';
import { Url } from '../../decorators/url.decorator';
import { AbstractCrudService } from '../../abstract/abstractCrud.service';
import { Post } from './entities/post.entity';

@Injectable()
@Url('/posts')
export class PostsService extends AbstractCrudService<Post> {
  constructor() {
    super();
  }
}
