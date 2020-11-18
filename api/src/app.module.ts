import { RatingModule } from './rating/rating.module';
import { CommentModule } from './comment/comment.module';
import { DonequizModule } from './donequiz/donequiz.module';
import { QuestionModule } from './question/question.module';
import { QuizzModule } from './quizz/quizz.module';
import { CategoryModule } from './category/category.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    RatingModule,
    CommentModule,
    DonequizModule,
    UsersModule,
    QuestionModule,
    QuizzModule,
    CategoryModule,
    MongooseModule.forRoot('mongodb+srv://atlas_dbuser:atlas_dbpassword@cluster0.mamvx.mongodb.net/Quizz'),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
