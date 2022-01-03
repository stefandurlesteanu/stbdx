import { Injectable } from '@nestjs/common';
import { Url } from '../../decorators/url.decorator';
import { AbstractCrudService } from '../../abstract/abstractCrud.service';
import { User } from './entities/user.entity';

@Injectable()
@Url('/users')
export class UsersService extends AbstractCrudService<User> {
  constructor() {
    super();
  }
}
