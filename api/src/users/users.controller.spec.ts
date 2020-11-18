import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema, UserRef } from './user.model';
import { UsersModule } from './users.module'

let mongod: MongoMemoryServer;

describe('UsersController', () => {
  let module: TestingModule;
  let controller: UsersController;
  let service: UsersService;

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
        MongooseModule.forFeature([
          { name: UserRef, schema: UserSchema },
        ]),
        UsersModule,
      ],
      controllers: [UsersController],
      providers: [UsersService,],
      exports: [UsersService, MongooseModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
