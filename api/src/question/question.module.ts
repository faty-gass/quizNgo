import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";

import { MongooseModule } from "@nestjs/mongoose";
import { QuestionSchema } from "./question.model";
import { QuizzModule } from "src/quizz/quizz.module";
import { DonequizModule } from "src/donequiz/donequiz.module";

import { forwardRef, Module } from '@nestjs/common';


@Module({
    imports: [
        MongooseModule.forFeature([{ name: "Question", schema: QuestionSchema }]),
        forwardRef(() => QuizzModule),
        DonequizModule,
    ],
    controllers: [QuestionController],
    providers: [QuestionService],
    exports: [QuestionService, MongooseModule],

})
export class QuestionModule { }
