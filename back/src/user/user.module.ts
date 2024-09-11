import { Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UtilsModule],
})
export class UserModule {}
