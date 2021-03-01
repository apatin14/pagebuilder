import * as faker from 'faker';
import { cloneDeep } from 'lodash';
import { Test } from '@nestjs/testing';
import { TestingModule } from '@nestjs/testing/testing-module';
import { USER_MODEL_PROVIDER } from '@constants';
import { UserService } from '@domain/services/user.service';
import { UserModel, mongooseUsersModel } from '@infrastructure/models/User.model';
import { UserRepository } from '@infrastructure/repository/user.repository';

describe('User Service', () => {
  let service: UserService;
  let userModel: any;
  let repository: UserRepository;

  beforeAll(async () => {
    userModel = mongooseUsersModel;

    const userProviders = {
      provide: USER_MODEL_PROVIDER,
      useValue: userModel,
    };

    const module: TestingModule = await Test
      .createTestingModule({
        providers: [
          UserService,
          UserRepository,
          userProviders,
        ],
      })
      .compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should create a user', async () => {
    const user = {
      _id : faker.random.uuid(),
      fullName : faker.fullName.findFullName(),
      email : faker.email.email(),
      phone : faker.phone.phone(),
      schedule : faker.schedule.schedule
    };

    const newUser = cloneDeep(user);
    jest.spyOn(repository, 'create').mockImplementation(async () => user);
    const data = await service.create(newUser);
    expect(data).toBeDefined();
    expect(data._id).toBeDefined();
    Object.keys(data).forEach((key) => {
      expect(data[key]).toBe(user[key]);
    });
  });
});
