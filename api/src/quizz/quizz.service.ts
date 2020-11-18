import * as Mongoose from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Quizz } from "./quizz.model";
import { Question } from "src/question/question.model";
import { Donequiz } from "src/donequiz/donequiz.model";
import { DonequizService } from "src/donequiz/donequiz.service";
import { CommentService } from "src/comment/comment.service";
import { User } from "src/users/user.model";
import { UsersService } from "src/users/users.service";
import { ObjectId } from "mongodb";

@Injectable()
export class QuizzService {
  constructor(
    @InjectModel("Quizz") private readonly quizzModel: Model<Quizz>,
    @InjectModel("Donequiz") private readonly donequizModel: Model<Donequiz>,
    @InjectModel("Question") private readonly questionModel: Model<Question>,
    @InjectModel("User") private readonly userModel: Model<User>,
    private readonly doneQuizService: DonequizService,
    private readonly commentService: CommentService,
    private readonly userService: UsersService,
  ) { }

  async createQuizz(
    name: string,
    category: Mongoose.Schema.Types.ObjectId,
    difficulty: String,
    bonus_time: Number,
    bonus_xp: Number,
    is_published: Boolean,
  ) {
    const newQuizz = new this.quizzModel({
      name,
      category,
      difficulty,
      bonus_time,
      bonus_xp,
      is_published,
    });
    const result = await newQuizz.save();
    return result.id;
  }

  async showQuizzes() {
    const quizzes = await this.quizzModel
      .find()
      .sort({ createdAt: "desc" })
      .populate("category")
      .exec();
    return quizzes.map(quiz => ({
      id: quiz._id,
      name: quiz.name,
      category: quiz.category,
      difficulty: quiz.difficulty,
      bonus_time: quiz.bonus_time,
      bonus_xp: quiz.bonus_xp,
      avg_rating: quiz.avg_rating,
      is_published: quiz.is_published,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));
  }

  async getQuizzesWithStats() {
    const quizzes = await this.quizzModel
      .find()
      .sort({ createdAt: "desc" })
      .populate("category")
      .exec();
    const counts = await this.doneQuizService.countQuiz();
    const successratio = await this.doneQuizService.avgSuccessratio();
    const comments = await this.commentService.countOneQuizComments();
    return quizzes.map(quiz => ({
      id: quiz._id,
      name: quiz.name,
      category: quiz.category,
      difficulty: quiz.difficulty,
      bonus_time: quiz.bonus_time,
      bonus_xp: quiz.bonus_xp,
      avg_rating: quiz.avg_rating,
      playcount: counts.find(
        count => count._id.toString() === quiz._id.toString(),
      )
        ? counts.find(count => count._id.toString() === quiz._id.toString())
          .count
        : null,

      success_ratio: successratio.find(
        ratio => ratio._id.toString() === quiz._id.toString(),
      )
        ? successratio.find(
          ratio => ratio._id.toString() === quiz._id.toString(),
        ).average
        : null,

      commentsCount: comments.find(
        comment => comment._id.toString() === quiz._id.toString(),
      )
        ? comments.find(
          comment => comment._id.toString() === quiz._id.toString(),
        ).count
        : null,

      is_published: quiz.is_published,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));
  }

  async showPublishedQuizzes() {
    const quizzes = await this.quizzModel
      .find({ is_published: true })
      .sort({ createdAt: "desc" })
      .populate("category")
      .exec();
    return quizzes.map(quiz => ({
      id: quiz._id,
      name: quiz.name,
      category: quiz.category,
      difficulty: quiz.difficulty,
      bonus_time: quiz.bonus_time,
      bonus_xp: quiz.bonus_xp,
      avg_rating: quiz.avg_rating,
      is_published: quiz.is_published,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));
  }

  async showOneQuizz(id: Mongoose.Schema.Types.ObjectId) {
    const quiz = await this.quizzModel
      .findById(id)
      .populate("category")
      .exec();
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    } else {
      return {
        id: quiz._id,
        name: quiz.name,
        category: quiz.category,
        difficulty: quiz.difficulty,
        bonus_time: quiz.bonus_time,
        bonus_xp: quiz.bonus_xp,
        avg_rating: quiz.avg_rating,
        is_published: quiz.is_published,
        created_at: quiz.createdAt,
        updated_at: quiz.updatedAt,
      };
    }
  }

  async update(
    id: Mongoose.Schema.Types.ObjectId,
    name: string,
    category: Mongoose.Schema.Types.ObjectId,
    difficulty: String,
    bonus_time: Number,
    bonus_xp: Number,
    avg_rating: Number,
    is_published: Boolean,
  ) {
    const quiz = await this.quizzModel.findById(id).exec();
    if (!quiz) {
      throw new NotFoundException("Quiz not found");
    } else {
      if (name) {
        quiz.name = name;
      }
      if (category) {
        quiz.category = category;
      }
      if (difficulty) {
        quiz.difficulty = difficulty;
      }
      if (bonus_time) {
        quiz.bonus_time = bonus_time;
      }
      if (bonus_xp) {
        quiz.bonus_xp = bonus_xp;
      }
      if (avg_rating) {
        quiz.avg_rating = avg_rating;
      }
      if (is_published !== null) {
        quiz.is_published = is_published;
      }
      quiz.save();
      return " Quiz successfully updated";
    }
  }

  async delete(id: Mongoose.Schema.Types.ObjectId) {


    const quiz = await this.quizzModel.deleteOne({ _id: id }).exec();
    if (quiz.deletedCount === 0) {
      throw new NotFoundException("Quiz not found");
    } else {
      const questions = await this.questionModel
        .deleteMany({ quizz_id: id })
        .exec();
      const donequiz = await this.donequizModel.deleteMany({ quizz_id: id }).exec();
      const allUser = await this.userModel.find({ favorites: id }).exec();
      allUser.forEach(user => {
        const newFav: [Mongoose.Schema.Types.ObjectId] = [id]
        user.favorites.forEach(fav => {
          if (fav != id) {
            newFav.push(fav);
          }
        })
        const result = newFav.shift()
        //console.log("neFav", newFav)
        this.userService.updateFav(user._id, newFav)
      })
      if (questions.deletedCount === 0 && donequiz.deletedCount == 0) {
        return "Quiz successfully deleted";
      } else {
        return "Quiz and related dependency successfully deleted";
      }
    }
  }

  async filter(field: string, query: string) {
    const quizzes = await this.quizzModel
      .find({ [field]: query })
      .populate("category")
      .exec();
    if (quizzes) {
      return quizzes.map(quiz => ({
        id: quiz._id,
        name: quiz.name,
        category: quiz.category,
        difficulty: quiz.difficulty,
        bonus_time: quiz.bonus_time,
        bonus_xp: quiz.bonus_xp,
        avg_rating: quiz.avg_rating,
        is_published: quiz.is_published,
        created_at: quiz.createdAt,
        updated_at: quiz.updatedAt,
      }));
    } else {
      throw new NotFoundException("No match found");
    }
  }

  async search(query: string) {
    const quizzes = await this.quizzModel
      .find({ name: { $regex: query, $options: "i" } })
      .populate("category")
      .exec();
    if (quizzes) {
      return quizzes.map(quiz => ({
        id: quiz._id,
        name: quiz.name,
        category: quiz.category,
        difficulty: quiz.difficulty,
        bonus_time: quiz.bonus_time,
        bonus_xp: quiz.bonus_xp,
        avg_rating: quiz.avg_rating,
        is_published: quiz.is_published,
        created_at: quiz.createdAt,
        updated_at: quiz.updatedAt,
      }));
    } else {
      throw new NotFoundException("No match found");
    }
  }

  async sort(sort: string) {
    const quizz = await this.quizzModel
      .find()
      .sort({ createdAt: sort })
      .populate("category")
      .exec();
    return quizz.map(quiz => ({
      id: quiz._id,
      name: quiz.name,
      category: quiz.category,
      difficulty: quiz.difficulty,
      bonus_time: quiz.bonus_time,
      bonus_xp: quiz.bonus_xp,
      avg_rating: quiz.avg_rating,
      is_published: quiz.is_published,
      created_at: quiz.createdAt,
      updated_at: quiz.updatedAt,
    }));
  }

  async searchAll(
    query: string,
    level: string,
    category: Mongoose.Schema.Types.ObjectId,
    sort: string,
  ) {
    let payload;
    if (level && category) {
      payload = {
        name: { $regex: query, $options: "i" },
        is_published: true,
        difficulty: level,
        category: category,
      };
    } else if (level && !category) {
      payload = {
        name: { $regex: query, $options: "i" },
        is_published: true,
        difficulty: level,
      };
    } else if (!level && category) {
      payload = {
        name: { $regex: query, $options: "i" },
        is_published: true,
        category: category,
      };
    } else {
      payload = {
        name: { $regex: query, $options: "i" },
        is_published: true,
      };
    }
    const quizzes = await this.quizzModel
      .find(payload)
      .sort({ createdAt: sort })
      .populate("category")
      .exec();
    if (quizzes) {
      return quizzes.map(quiz => ({
        id: quiz._id,
        name: quiz.name,
        category: quiz.category,
        difficulty: quiz.difficulty,
        bonus_time: quiz.bonus_time,
        bonus_xp: quiz.bonus_xp,
        avg_rating: quiz.avg_rating,
        is_published: quiz.is_published,
        created_at: quiz.createdAt,
        updated_at: quiz.updatedAt,
      }));
    } else {
      throw new NotFoundException("No match found");
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  async suggestQuiz(userId: Mongoose.Schema.Types.ObjectId) {
    const donequizzArr = await this.doneQuizService.listDoneQuiz(userId);
    const allquizz = await this.quizzModel
      .find()
      .populate("category")
      .exec();
    const notDonequiz = await this.quizzModel
      .find({ _id: { $nin: donequizzArr } })
      .populate("category")
      .exec();
    if (notDonequiz.length) {
      const random = this.getRandomInt(notDonequiz.length);
      const result = notDonequiz[random];
      return {
        id: result._id,
        name: result.name,
        category: result.category,
        difficulty: result.difficulty,
        bonus_time: result.bonus_time,
        bonus_xp: result.bonus_xp,
        avg_rating: result.avg_rating,
        is_published: result.is_published,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
      };
    } else {
      const random = this.getRandomInt(allquizz.length);
      const result = allquizz[random];
      return {
        id: result._id,
        name: result.name,
        category: result.category,
        difficulty: result.difficulty,
        bonus_time: result.bonus_time,
        bonus_xp: result.bonus_xp,
        avg_rating: result.avg_rating,
        is_published: result.is_published,
        created_at: result.createdAt,
        updated_at: result.updatedAt,
      };
    }
  }
}
