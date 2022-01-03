import { Module } from '@nestjs/common';
import { HttpModule } from "@nestjs/axios";
import { UsersModule } from './modules/users/users.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [HttpModule, UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
