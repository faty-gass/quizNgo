import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./category.model";
import { QuizzModule } from "src/quizz/quizz.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
    forwardRef(() => QuizzModule),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [MongooseModule, CategoryService],
})
export class CategoryModule {}
