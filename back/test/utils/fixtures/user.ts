import * as request from 'supertest';
import * as _ from 'lodash';
import { INestApplication } from '@nestjs/common';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { createUserDtoName } from '@/modules/users/dto/create-user.dto';

export const createUser = async (app: INestApplication, dto: CreateUserDto) => {
  const res = await request(app.getHttpServer())
    .post('/graphql')
    .send({
      query: `
        mutation($dto: ${_.upperFirst(createUserDtoName)}!) {
          createUser(${createUserDtoName}: $dto) {
            email,
            _id,
            login,
            avatar
          }
        }
      `,
      variables: {
        dto,
      },
    });
  return res;
};

export const UserFixtures = {
  createUser,
};
