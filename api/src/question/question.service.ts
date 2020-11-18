import * as Mongoose from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Answer, Question } from "./question.model";
import { Quizz } from "../quizz/quizz.model";
import { Donequiz } from "src/donequiz/donequiz.model";
import { DonequizService } from "src/donequiz/donequiz.service";

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel("Question") private readonly questionModel: Model<Question>,
    @InjectModel("Quizz") private readonly quizModel: Model<Quizz>,
    @InjectModel("Donequiz") private readonly DonequizModel: Model<Donequiz>,
    private readonly doneQuizService: DonequizService,
  ) { }

  async getResults(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    answers: [[Number]],
    timeout: Boolean,
    user_id: Mongoose.Schema.Types.ObjectId,
  ) {
    const results = [];
    let score: number = 0;
    const quiz = await this.quizModel.findById(quizz_id).exec();
    const questions = await this.showAdminQuestions(quizz_id);
    questions.forEach((question, idx) => {
      const userAnswers = answers[idx];
      const goodAnswers = [];
      question.answers.forEach((answer, idx) => {
        if (answer.is_correct) goodAnswers.push(idx);
      });
      const isGoodAnswer =
        JSON.stringify(goodAnswers.sort()) ===
        JSON.stringify(userAnswers.sort());
      if (isGoodAnswer) score += question.xps.valueOf();
      results.push({
        index: idx,
        is_good_answer: isGoodAnswer,
        good_answers: goodAnswers.sort(),
        user_answers: userAnswers.sort(),
        xps: isGoodAnswer ? questions[idx].xps : 0,
      });
    });
    const success_rate = Math.trunc(
      (results.filter(r => r.is_good_answer).length / questions.length) * 100,
    );
    score += timeout ? 0 : success_rate > 75 ? quiz.bonus_xp.valueOf() : 0;

    if (user_id) {
      const doneQuiz = await this.doneQuizService.enterQuiz(
        user_id,
        quizz_id,
        score,
        success_rate,
      );
    }

    return { results, score, success_rate };
  }

  async createQuestion(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    xps: Number,
    question: String,
    answers: [Answer],
  ) {
    const newQuestion = new this.questionModel({
      quizz_id,
      xps,
      question,
      answers,
    });
    const result = await newQuestion.save();
    if (result) {
      return result._id;
    }
  }

  async createQuestions(questions: [Question]) {
    questions.map(async quest => {
      const newQuestion = new this.questionModel({
        quizz_id: quest.quizz_id,
        xps: quest.xps,
        question: quest.question,
        answers: quest.answers,
      });
      const result = await newQuestion.save();
    });
    return questions.length + " question(s) added";
  }

  async showQuestions(quizz_id: Mongoose.Schema.Types.ObjectId) {
    const questions = await this.questionModel
      .find({ quizz_id: quizz_id })
      .exec();

    questions.map(quest => {
      let cpt = 0;
      quest.answers.forEach(a => {
        if (a.is_correct) cpt++;
      });
      quest.is_multi = cpt > 1;
      return quest.answers.map(answer => {
        delete answer.is_correct;
        return {
          answer: answer,
        };
      });
    });

    return questions.map(quest => ({
      id: quest._id,
      quizz_id: quest.quizz_id,
      xps: quest.xps,
      question: quest.question,
      is_multi: quest.is_multi,
      answers: quest.answers,
    }));
  }

  async showAdminQuestions(quizz_id: Mongoose.Schema.Types.ObjectId) {
    const questions = await this.questionModel
      .find({ quizz_id: quizz_id })
      .exec();
    return questions.map(quest => ({
      id: quest._id,
      quizz_id: quest.quizz_id,
      xps: quest.xps,
      question: quest.question,
      answers: quest.answers,
    }));
  }

  async showAllQuestions() {
    const questions = await this.questionModel.find().exec();
    return questions.map(quest => ({
      id: quest._id,
      quizz_id: quest.quizz_id,
      xps: quest.xps,
      question: quest.question,
      answers: quest.answers,
    }));
  }

  /*   async update(
      quest_id: Mongoose.Schema.Types.ObjectId,
      xps: Number,
      question: String,
      answers: [Object]) {
      const newquestion = await this.questionModel.findById(quest_id).exec();
      if (!newquestion) {
        throw new NotFoundException('Question not found');
      } else {
        if (xps) {
          newquestion.xps = xps
        }
        if (question) {
          newquestion.question = question
        }
        if (answers) {
          newquestion.answers = answers
        }
        return {
          id: newquestion._id,
          quizz_id: newquestion.quizz_id,
          xps: newquestion.xps,
          question: newquestion.question,
          answers: newquestion.answers
        };
      }
    } */

  async updateQuestions(
    quizz_id: Mongoose.Schema.Types.ObjectId,
    questions: [Question],
  ) {
    questions.map(async quest => {
      const newquestion = await this.questionModel.findById(quest.id).exec();
      if (!newquestion) {
        throw new NotFoundException("Question not found");
      } else {
        newquestion.xps = quest.xps;
        newquestion.question = quest.question;
        newquestion.answers = quest.answers;
        newquestion.save();
      }
    });
    return questions.length + " questions updated !";
  }

  async delete(quest_id: Mongoose.Schema.Types.ObjectId) {
    const quest = await this.questionModel.deleteOne({ _id: quest_id }).exec();
    if (quest.deletedCount === 0) {
      throw new NotFoundException("Question not found");
    } else {
      return "Question successfully deleted";
    }
  }

  async deleteAll(quiz_id: Mongoose.Schema.Types.ObjectId) {
    const quest = await this.questionModel
      .deleteMany({ quizz_id: quiz_id })
      .exec();

    return "Questions successfully deleted";
  }
}
