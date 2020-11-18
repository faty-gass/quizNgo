import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizzModule } from 'src/quizz/quizz.module';
import { RatingSchema } from './rating.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema }]),
        QuizzModule
    ],
    controllers: [
        RatingController,
    ],
    providers: [
        RatingService,
    ],
})
export class RatingModule { }
