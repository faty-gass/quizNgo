import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';
import { CategoryService } from './category.service';
import { CategorySchema, CategoryRef } from './category.model'
import { CategoryModule } from './category.module';
import { CategoryController } from './category.controller';

let mongod: MongoMemoryServer;

describe('CategoryController', () => {
  let module: TestingModule;
  let categoryService: CategoryService;
  //let categoryController: CategoryController

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
          { name: CategoryRef, schema: CategorySchema },
        ]),
        CategoryModule,
      ],
      /*       controllers: [
              CategoryController,
            ], */
      providers: [CategoryService,],
    }).compile();

    categoryService = await module.get(CategoryService);
    //categoryController = module.get(CategoryController)
  });

  it('Category service should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  /*   it('Category controller should be defined', () => {
      expect(categoryController).toBeDefined();
    }); */

  it('create category should return data', async () => {
    const result = await categoryService.createCategory('Javascript');
    expect(result).toBeDefined();
  });

  it('show categories should return object', async () => {
    const result = await categoryService.showCategories();
    expect(typeof (result)).toBe('object');
  });


});