import { INestApplication } from '@nestjs/common';
import { UsersModule } from './users.module';
import { createTestingModule } from '@test/utils/testing-module';
import { ValidationPipe } from '@/common/pipes/validation.pipe';
import * as _ from 'lodash';
import { UsersService } from './users.service';
import * as m from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { flushMongo } from '@test/utils/flush-mongo';
import { UserFixtures } from '@test/utils/fixtures/user';

describe('Users module', () => {
  let app: INestApplication;
  let usersService: UsersService;
  let conn: Connection;
  const userDto = {
    login: 'petya',
    email: 'vasya@mail.com',
    password: '1234',
  };

  beforeAll(async () => {
    const moduleFixture = await createTestingModule([UsersModule]);
    usersService = await moduleFixture.resolve(UsersService.name);
    conn = await moduleFixture.resolve(m.getConnectionToken());
    app = moduleFixture.createNestApplication();
    app.getHttpServer();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  beforeEach(async () => {
    await flushMongo(conn);
  });
  afterAll(async () => {
    await app.close();
  });

  describe('create user', () => {
    it('should create user', async () => {
      const { body } = await UserFixtures.createUser(app, userDto);
      expect(_.isEmpty(body.errors)).toBeTruthy();
      expect(body.data.createUser).toMatchObject(
        _.omit(userDto, 'password', 'email'),
      );
    });
    it('should throw if login exists', async () => {
      await UserFixtures.createUser(app, userDto);
      const { body } = await UserFixtures.createUser(app, userDto);
      expect(body.errors[0].message).toBe('login exists');
    });
    it('should throw if email exists', async () => {
      const {
        body: {
          data: { createUser: oldUser },
        },
      } = await UserFixtures.createUser(app, userDto);
      await usersService.updateById(oldUser._id, { email: userDto.email });
      const { body } = await UserFixtures.createUser(app, {
        ...userDto,
        login: 'petya2',
      });
      expect(body.errors[0].message).toBe('email exists');
    });
  });
});
