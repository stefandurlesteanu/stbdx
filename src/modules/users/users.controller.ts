import { Controller } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AbstractController } from '../../abstract/abstract.controller';


@Controller('users')
export class UsersController extends AbstractController<User> {

  constructor(private readonly usersService: UsersService) {
    super(usersService);
  }
}
