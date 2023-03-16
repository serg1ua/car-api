# CAR API

## Environment

* Create .env and .env.production files in the root directory with the following content

```shell
  NODE_ENV=dev # production
  PORT=3000
  POSTGRES_HOST=localhost
  POSTGRES_PORT=5432
  POSTGRES_USER=admin
  POSTGRES_PASSWORD=admin
  POSTGRES_DB=cars
  DISCOUNT=20
  START_MONTH=12
  END_MONTH=18
```

## Development

Set NODE_ENV=dev

Run:

```shell
npm i
npm run db:up
npm run cars:dev
```

Navigate to <http://localhost:3000/api> to use Swagger

## Production

Set MODE_ENV=prod

Run:

```shell
npm i
npm run cars
```

 The server is running on <http://localhost:3000>

Stop:

```shell
npm run cars:stop
```

## Tests

* To run unit tests, run:

```shell
npm run test
```

* To run e2e tests:

```shell
npm i
npm run db:up
npm run test:e2e
```
