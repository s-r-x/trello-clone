import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BoardsModule } from './boards.module';
import { createTestingModule } from '@test/utils/testing-module';
import { ValidationPipe } from '@/common/pipes/validation.pipe';

describe('Boards module', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await createTestingModule([BoardsModule]);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });

  it('testik', async () => {
    await request(app.getHttpServer())
      .post('/graphql')
      .expect(500);
  });
});
