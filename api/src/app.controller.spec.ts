import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule } from './app.module';

let mongod: MongoMemoryServer;

describe('AppController', () => {
  let module: TestingModule;
  let appController: AppController;
  let appService: AppService

  afterEach(async () => {
    await module.close();
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    mongod = new MongoMemoryServer()
    module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongod.getUri(),
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
          }),
        }),
        AppModule,
      ],
      controllers: [AppController],
      providers: [AppService,],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('root', () => {
    it('App controller should be defined', () => {
      expect(appController).toBeDefined();
    });
    it('App service should be defined', () => {
      expect(appService).toBeDefined();
    });
  });
});
