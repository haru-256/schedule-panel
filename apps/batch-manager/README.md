# Batch Manager

## Description

BatchとそのJobの管理を行う。Jobの実行はCloud Batchで行う。

## TODO

- [ ] Jobのstatusが初めて `ERROR` or `SUCCEEDED`, `SCHEDULED`のまま一定時間経過 したらSlackに通知する
  - ↑は`job-monitor`で管理する？
- [ ] Loggingの実装
- [ ] テストの実装
- [ ] Gracefull Shutdownを実装する
  - <https://docs.nestjs.com/fundamentals/lifecycle-events>
- [ ] Cloud Runで実行する

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
