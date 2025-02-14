import AppError from "@shared/errors/AppError";
import { User } from '../infra/database/entities/User';
import { usersRepositories } from '../infra/database/repositories/UsersRepositories';
import uploadConfig from "@config/upload";
import path from "path";
import fs from 'fs'

interface IUpdateUserAvatar {
  userId: number;
  avatarFileName: string;
}

export class UpdateUserAvatarService {
  async execute({ userId, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);


      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);


      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await usersRepositories.save(user);

    return user;
  }
}