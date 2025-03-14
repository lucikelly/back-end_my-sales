import AppError from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import FakeUserRepository from '../domain/repositories/fakes/FakeUserRepositories';
import CreateUserService from './CreateUserService';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
}));

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });
  it('should be able to create a new user ', async () => {
    (hash as jest.Mock).mockReturnValue('hashed-password');

    const user = await createUserService.execute({
      name: 'Cara legal',
      email: 'carinha@gmail.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('carinha@gmail.com');
  });
  it('shpuld not be able to create a user with an existing email ', async () => {
    await createUserService.execute({
      name: 'Cara legal',
      email: 'carinha@gmail.com',
      password: '12345',
    });

    await expect(
      createUserService.execute({
        name: 'Cara legal',
        email: 'carinha@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should hash the password before saving the user ', async () => {
    const hashSpy = jest
      .spyOn(require('bcrypt'), 'hash')
      .mockReturnValue('hashed-password');

     await createUserService.execute({
       name: 'Cara legal',
       email: 'carinha@gmail.com',
       password: '12345',
     });

     expect(hashSpy).toHaveBeenCalledWith('12345', 8);
  });
});
