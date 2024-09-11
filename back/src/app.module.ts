// Nest Js
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Modules
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { ExercisesModule } from './exercises/exercises.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { SetsModule } from './sets/sets.module';

// Database
import { PrismaDbModule } from './prisma-db/prisma-db.module';

@Module({
  imports: [
    AuthModule,
    PrismaDbModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    UtilsModule,
    ExercisesModule,
    WorkoutsModule,
    SetsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
