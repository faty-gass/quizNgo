import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { QuizzService } from './quizz.service';
import { QuizzSchema, QuizzRef } from './quizz.model'
import { QuizzModule } from './quizz.module';
import { QuestionModule } from '../question/question.module'
import { QuizzController } from './quizz.controller';
import { DonequizModule } from 'src/donequiz/donequiz.module';

const ObjectID = require('mongodb').ObjectID;
let mongod: MongoMemoryServer;

describe('QuizzController', () => {
  let module: TestingModule;
  let service: QuizzService;
  let controller: QuizzController

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
          { name: QuizzRef, schema: QuizzSchema },
        ]),
        QuizzModule,
        DonequizModule,
        QuestionModule
      ],
      controllers: [QuizzController],
      providers: [QuizzService,],
      exports: [MongooseModule, QuizzService],
    }).compile();
    service = module.get(QuizzService);
    controller = module.get(QuizzController);
  });

  it('Quizz service should be defined', () => {
    expect(service).toBeDefined();
  });


  it('show one quizz should return object', async () => {
    const id: mongoose.Schema.Types.ObjectId = new ObjectID()
    const result = await service.showOneQuizz(id);
    expect(typeof (result)).toBe('object');
  });


});