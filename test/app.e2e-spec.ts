import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Car } from '../src/car/car.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let car: Car;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/car/create (POST)', async () => {
    const carCreate = {
      manufacturerName: 'Ford',
      price: 1000,
    };

    const { body } = await request(app.getHttpServer())
      .post('/car/create')
      .send(carCreate)
      .expect(201);
    car = body;

    expect(body).toEqual({
      id: expect.any(Number),
      price: expect.any(Number),
      firstRegistrationDate: expect.any(Number),
      manufacturer: expect.any(Object),
    });
  });

  it('/car (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get('/car')
      .expect(200);

    expect(body).toBeInstanceOf(Array);
    car = body[0];
    for (const car of body) {
      expect(car).toEqual({
        id: expect.any(Number),
        price: expect.any(Number),
        firstRegistrationDate: expect.any(String),
        owners: expect.any(Array)
      });
    }
  });

  it('/car/:id (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/car/${car.id}`)
      .expect(200);

    expect(body).toEqual({
      id: expect.any(Number),
      price: expect.any(Number),
      firstRegistrationDate: expect.any(String),
      owners: expect.any(Array)
    });
  });

  it('/car/:id/manufacturer (GET)', async () => {
    const { body } = await request(app.getHttpServer())
      .get(`/car/${car.id}/manufacturer`)
      .expect(200);

    expect(body).toBeInstanceOf(Object);
    expect(body.id).toBeGreaterThan(0);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('phone');
    expect(body).toHaveProperty('name');
    expect(body).toHaveProperty('siret');
  });

  it('/car/:id (PUT)', async () => {
    const carUpdate = {
      price: 12000
    };

    const { body } = await request(app.getHttpServer())
      .put(`/car/${car.id}`)
      .send(carUpdate)
      .expect(200);

    expect(body).toBeDefined();
  });

  it('/car/:id (DELETE)', async () => {
    const { body } = await request(app.getHttpServer())
      .delete(`/car/${car.id}`)
      .expect(200);

    expect(body).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});