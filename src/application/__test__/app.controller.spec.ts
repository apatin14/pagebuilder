import * as faker from 'faker';
import { Test } from '@nestjs/testing';
import { has, cloneDeep } from 'lodash';
import { TestingModule } from '@nestjs/testing/testing-module';
import { AppController } from '@application/controllers/app.controller';
import { UserService } from '@domain/services/user.service';
import { UserModel } from '@infrastructure/models/User.model';
import { User } from '@domain/entities/User';
import { USER_MODEL_PROVIDER } from '@constants';
import { UserRepository } from '@infrastructure/repository/user.repository';

describe('User Controller', () => {
  let controller: AppController;
  let service: UserService;
  let userModel: UserModel;

  beforeAll(async () => {
    const userProviders = {
      provide: USER_MODEL_PROVIDER,
      useValue: userModel,
    };

    const module: TestingModule = await Test
      .createTestingModule({
        controllers: [AppController],
        providers: [
          UserService,
          UserRepository,
          userProviders,
        ],
      })
      .compile();

    controller = module.get<AppController>(AppController);
    service = module.get<UserService>(UserService);
  });

  it('should create an user', async () => {
    const user = {
      _id : faker.random.uuid(),
      fullName : faker.fullName.findFullName(),
      email : faker.email.email(),
      phone : faker.phone.phone(),
      schedule : faker.schedule.schedule
    };
    const newUser = cloneDeep(user);
    jest.spyOn(service, 'create').mockImplementation(async () => user);
    const data = await controller.create(newUser);
    expect(data).toBeDefined();
    expect(has(data , '_id')).toBeTruthy();
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(user[key]);
    });
  });

  it('should return Hello word', async () => {
    const data = await controller.get();
    expect(data).toBeDefined();
    expect(data).toBe('Hello World!');
  });
});
