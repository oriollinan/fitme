import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma-db/prisma-db.service';
import { UserUpdateDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaDbService) {}

  async getUserById(id: number) {
    const userInfo = await this.prismaService.user.findUnique({
      where: { id },
    });

    delete userInfo.password;
    return { userInfo };
  }

  async updateProfile(id: number, dto: UserUpdateDto) {
    const checkExistance = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!checkExistance) {
      throw new NotFoundException('User not found');
    }
    const newUser = await this.prismaService.user.update({
      where: { id },
      data: dto,
    });
    delete newUser.password;
    return newUser;
  }

  async deleteUser(id: number) {
    const checkExistance = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!checkExistance) {
      throw new NotFoundException('User not found');
    }
    await this.prismaService.user.delete({
      where: { id },
    });
    return {};
  }
}
