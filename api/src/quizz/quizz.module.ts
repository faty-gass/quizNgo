import { QuizzController } from "./quizz.controller";
import { QuizzService } from "./quizz.service";
import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuizzSchema } from "./quizz.model";
import { QuestionModule } from "src/question/question.module";
import { DonequizModule } from "src/donequiz/donequiz.module";
import { CommentModule } from "src/comment/comment.module";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Quizz", schema: QuizzSchema }]),
    forwardRef(() => QuestionModule),
    DonequizModule,
    CommentModule,
    UsersModule
  ],
  controllers: [QuizzController],
  providers: [QuizzService],
  exports: [MongooseModule, QuizzService],
})
export class QuizzModule { }
