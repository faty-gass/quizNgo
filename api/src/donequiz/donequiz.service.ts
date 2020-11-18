import * as Mongoose from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Donequiz } from "./donequiz.model";
import { Category } from "../category/category.model";
import { User } from "src/users/user.model";
import { argv } from "process";
//import { UsersService } from "src/users/users.service";
// import { Quizz } from "src/quizz/quizz.model";

@Injectable()
export class DonequizService {
  constructor(
    @InjectModel("Donequiz") private readonly donequizModel: Model<Donequiz>,
    @InjectModel("Category") private readonly categoryModel: Model<Category>,
    @InjectModel("User") private readonly userModel: Model<User>, //private readonly userService: UsersService,
  ) { }

  async enterQuiz(
    user_id: Mongoose.Schema.Types.ObjectId,
    quizz_id: Mongoose.Schema.Types.ObjectId,
    score: Number,
    success_rate: Number,
  ) {
    const user = await this.userModel.findById(user_id).exec();
    const doneQuiz = await this.donequizModel
      .findOne({ user_id, quizz_id })
      .exec();
    if (doneQuiz) {
      if (doneQuiz.score < score) {
        user.score = user.score.valueOf() - doneQuiz.score.valueOf();
        doneQuiz.score = score;
        doneQuiz.success_rate = success_rate;
        doneQuiz.save();
        user.score = user.score.valueOf() + score.valueOf();
        user.save();
        return doneQuiz;
      } else {
        return { message: "Previous score is higher" };
      }
    } else {
      const newEntry = new this.donequizModel({
        user_id,
        quizz_id,
        score,
        success_rate,
      });
      const result = await newEntry.save();
      user.score = user.score.valueOf() + score.valueOf();
      user.save();
      if (result) {
        return result;
      } else {
        throw new Error("Error in the creation !");
      }
    }
  }

  async getAllQuiz() {
    const quizz = await this.donequizModel.find().exec();
    return quizz.map(quiz => ({
      id: quiz._id,
      user_id: quiz.user_id,
      quizz_id: quiz.quizz_id,
      score: quiz.score,
      success_rate: quiz.success_rate,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));
  }

  async getOneUserQuiz(userId: Mongoose.Schema.Types.ObjectId) {
    const quizz = await this.donequizModel
      .find({ user_id: userId })
      .populate({
        path: 'quizz_id',
        populate: {
          path: 'category'
        }
      }).exec();

    const categories = await this.categoryModel.find().exec();

    const ret = quizz.map(quiz => ({
      id: quiz._id,
      user_id: quiz.user_id,
      quizz_id: quiz.quizz_id,
      score: quiz.score,
      success_rate: quiz.success_rate,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));

    return { quizzes: ret, categories: categories };
  }

  async getOneUserRank(userId: Mongoose.Schema.Types.ObjectId) {
    const userRanks = await this.getUserRanks();
    const rank = userRanks.findIndex(r => r._id == userId) + 1;
    return { user_id: userId, rank: rank };
  }

  async getUserRanks() {
    const ranks = await this.userModel
      .find({})
      .sort({ score: -1 })
      .exec();
    return ranks;
  }

  async countQuiz() {
    const count = await this.donequizModel.aggregate([
      {
        $group: {
          _id: "$quizz_id",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    return count;
  }

  async avgSuccessratio() {
    const avg = await this.donequizModel.aggregate([
      {
        $group: {
          _id: "$quizz_id",
          average: {
            $avg: "$success_rate",
          },
        },
      },
    ]);
    return avg;
  }

  async updateQuiz(
    id: Mongoose.Schema.Types.ObjectId,
    score: Number,
    success_rate: Number,
  ) {
    const quiz = await this.donequizModel.findById(id).exec();
    if (quiz) {
      if (score) {
        quiz.score = score;
      }
      if (success_rate) {
        quiz.success_rate = success_rate;
      }
      quiz.save();
      return quiz;
    } else {
      throw new NotFoundException("Quiz not found");
    }
  }

  async delete(id: Mongoose.Schema.Types.ObjectId) {
    const quiz = await this.donequizModel.deleteOne({ _id: id }).exec();
    if (quiz.deletedCount === 0) {
      throw new NotFoundException("Quiz not found");
    } else {
      return "Quiz successfully deleted !";
    }
  }

  async listDoneQuiz(userId: Mongoose.Schema.Types.ObjectId) {
    const quizz = await this.donequizModel.find({ user_id: userId }).exec();
    return quizz.map(quiz => (
      quiz.quizz_id
    ))
  }
}
