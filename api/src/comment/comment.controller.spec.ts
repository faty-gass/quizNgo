import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { CommentService } from './comment.service';
import { CommentSchema, CommentRef } from './comment.model'
import { CommentModule } from './comment.module';
import { CommentController } from './comment.controller';

let mongod: MongoMemoryServer;

describe('CommentController', () => {
  let module: TestingModule;
  let commentService: CommentService;
  //let commentController: CommentController;

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
          { name: CommentRef, schema: CommentSchema },
        ]),
        CommentModule,
      ],
      /*       controllers: [
              CommentController,
            ], */
      providers: [CommentService,],
    }).compile();
    commentService = await module.get(CommentService);
  });

  it('Comment service should be defined', () => {
    expect(commentService).toBeDefined();
  });
  /*   it('Comment controller should be defined', () => {
      expect(commentController).toBeDefined();
    }); */



});