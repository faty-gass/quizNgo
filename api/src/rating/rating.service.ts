import * as Mongoose from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rating } from './rating.model';
import { Quizz } from 'src/quizz/quizz.model';

@Injectable()
export class RatingService {
  constructor(
    @InjectModel('Rating') private readonly ratingModel: Model<Rating>,
    @InjectModel('Quizz') private readonly quizzModel: Model<Quizz>
  ) { }

  async createRating(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    user_id: Mongoose.Schema.Types.ObjectId,
    rating: number,
  ) {
    const oldRating = await this.ratingModel.findOne({ quizz_id, user_id }).exec();
    if (!oldRating) {
      const newRating = new this.ratingModel({ quizz_id, user_id, rating });
      const tmp = await newRating.save()
      const result = await this.updateAvg(quizz_id)
      return result;
    } else {
      return { message: "Quiz was already rated !" }
    }
  }

  async updateAvg(id: Mongoose.Schema.Types.ObjectId) {
    const average = await this.ratingModel.aggregate([{
      $group: {
        _id: "$quizz_id",
        avg_rating: { $avg: "$rating" }
      }
    }])
    const result = average.find(item => item._id == id);
    const quiz = await this.quizzModel.findOne({ _id: id }).exec();
    quiz.avg_rating = result.avg_rating
    quiz.save();
    return quiz
  }

  async getRatings() {
    const ratings = await this.ratingModel.find().exec();
    return ratings
  }

  async getOneRating(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    user_id: Mongoose.Schema.Types.ObjectId,
  ) {
    const rating = await this.ratingModel.findOne({ quizz_id, user_id })
    if (rating) {
      return {
        id: rating._id,
        rating: rating.rating,
        created_at: rating.createdAt
      }
    } else {
      return {
        message: "No existing rating found"
      }
    }

  }

}
