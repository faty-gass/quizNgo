import * as Mongoose from "mongoose";
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { QuestionService } from "./question.service";
import { Answer, Question } from "./question.model";
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from 'src/auth/roles.guards';

@Controller("question")
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  /**
  * @api {post} /question/one Create new question
  * @apiName CreateNewQuestion
  * @apiGroup Question
  * @apiDescription Adding one question to a specific quiz.
  *
  * @apiHeader {String} authorization Bearer token.
  * @apiPermission admin
  * 
  * @apiParam {String} quizz_id ID of the quiz.
  * @apiParam {Number} xps Number of points to win.
  * @apiParam {String} question Title of the question.
  * @apiParam {Object[]} answers List of answer objects with an 'answer' string property for the content and a 'is_correct' boolean property that indicates the right answer.
  *
  * @apiSuccess {String} id ID of the created question.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 201 OK
  *     {
  *       "id": "5f864813a6658f0cf8c6fc5b",
  *     }
  *
  * @apiError InternalServorError Database error while creating new entry.
  *
  */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post("one")
  async addQuestion(
    @Body("quizz_id") quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body("xps") xps: Number,
    @Body("question") question: String,
    @Body("answers") answers: [Answer],
  ) {
    const result = await this.questionService.createQuestion(
      quizz_id,
      xps,
      question,
      answers,
    );
    return { id: result };
  }


  /**
  * @api {post} /question/:id/result Check results
  * @apiName VerifyResults
  * @apiGroup Question
  * @apiDescription Check one user answers after they took the quiz.
  *
  * @apiParam {String} id ID of the quiz.
  * @apiParam {Array[]} answers Array containing one array per question with the index of the user's answer.
  * @apiParam {Boolean} timeout True if the user answered the quiz within the bonus time limit.
  * @apiParam {String} user_id ID of the user who took the quiz.
  *
  * @apiSuccess {Object[]} results Array containing a result object for each answer with properties index, is_good_answer, good_answers, user_answers, xps.
  * @apiSuccess {Number} score Total xps won in the quiz .
  * @apiSuccess {Number} success_rate Percentage of good answers.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "result": 
  *         [
  *           {
  *             "index": 0,
  *             "is_good_answer": true,
  *             "good_answers": [0,2],
  *             "user_answers": [0,2],
  *             "xps": 10,
  *           },
  *           ...
  *         ],
  *       "score" : 150,
  *       "success_rate" : 66,
  *     }
  *
  * @apiError InternalServorError.
  *
  */
  @Post(":id/result")
  async getResults(
    @Param("id") id: Mongoose.Schema.Types.ObjectId,
    @Body("answers") answers: [[Number]],
    @Body("timeout") timeout: Boolean,
    @Body("user_id") user_id: Mongoose.Schema.Types.ObjectId,
  ) {
    const result = await this.questionService.getResults(
      id,
      answers,
      timeout,
      user_id,
    );
    return result;
  }


  /**
  * @api {post} /question Create new questions
  * @apiName CreateNewQuestions
  * @apiGroup Question
  * @apiDescription Adding multiple questions to one quiz at once
  *
  * @apiHeader {String} authorization Bearer token.
  * @apiPermission admin
  * 
  * @apiParam {Object[]} questions Array of question objects with properties quizz_id, xps, question, answers.
  *
  * @apiSuccess {String} message ID of the created question.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": "3 question(s) added",
  *     }
  *
  * @apiError InternalServorError Database error while creating new entry.
  *
  */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addQuestions(@Body("questions") questions: [Question]) {
    const result = await this.questionService.createQuestions(questions);
    return { message: result };
  }


  /**
  * @api {get} /question/:id Get quiz questions
  * @apiName GetOneQuizQuestions
  * @apiGroup Question
  * @apiDescription Get all the questions from a given quiz without the correct answers.
  *
  * @apiParam {String} id ID of the quiz.
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *        {
  *           "id": "5f864813a6658f0cf8c6fc5b",
  *           "quizz_id": "5f7f4c46eb4a5b3d2eaa1e34",
  *           "xps": 10,
  *           "question": "Naxst JS est une techno pas encore inventée?",
  *           "is_multi": true,
  *           "answers":  [
  *              {
  *                "answer": "Oui",
  *              }, 
  *              {
  *                "answer": "Non",
  *              }, 
  *              {
  *                "answer": "Osef",
  *              }
  *            ],
  *         },
  *       ...
  *    ]
  *
  * @apiError InternalServorError .
  *
  */
  @Get(":id")
  async showQuizQuestions(@Param("id") id: Mongoose.Schema.Types.ObjectId) {
    const result = await this.questionService.showQuestions(id);
    return result;
  }



  /**
  * @api {get} /question/:id/admin Get quiz question(admin)
  * @apiName GetOneQuizQuestionsAdmin
  * @apiGroup Question
  * @apiDescription Get all the questions from a given quiz with the correct answers.
  * 
  * @apiHeader {String} authorization Bearer token.
  * @apiPermission admin
  * 
  * @apiParam {String} id ID of the quiz.
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *        {
  *           "id": "5f864813a6658f0cf8c6fc5b",
  *           "quizz_id": "5f7f4c46eb4a5b3d2eaa1e34",
  *           "xps": 10,
  *           "question": "Naxst JS est une techno pas encore inventée?",
  *           "answers":  [
  *              {
  *                "answer": "Oui",
  *                "is_correct": true
  *              },
  *              {
  *                "answer": "Non",
  *                "is_correct": false
  *              },
  *              {
  *                "answer": "Osef",
  *                "is_correct": true
  *              }
  *            ],
  *         },
  *       ...
  *    ]
  *
  * @apiError InternalServorError .
  *
  */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(":id/admin")
  async showAdminQuizQuestions(
    @Param("id") id: Mongoose.Schema.Types.ObjectId,
  ) {
    const result = await this.questionService.showAdminQuestions(id);
    return result;
  }

  @Get()
  async showQuestions() {
    const result = await this.questionService.showAllQuestions();
    return result;
  }


  /**
  * @api {patch} /question/:id Update questions
  * @apiName UpdateQuestion
  * @apiGroup Question
  * @apiPermission admin
  * @apiDescription Update multiple questions from one quiz at once.
  *
  * @apiHeader {String} authorization Bearer token.
  * @apiPermission admin
  * 
  * @apiParam {String} id ID of the quiz.
  * @apiParam {Object[]} question Array of question objects with properties id, quizz_id, xps, question, answers.
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": "6 question(s) updated !",
  *     }
  *
  * @apiError NotFoundError.
  * @apiErrorExample {json} Error-Response:
  *     HTTP/1.1 404 Not Found
  *     {
  *       "error": "Question not found"
  *     }
  *
  */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(":id")
  async updateQuestions(
    @Param("id") id: Mongoose.Schema.Types.ObjectId,
    @Body("questions") questions: [Question],
  ) {
    const result = await this.questionService.updateQuestions(id, questions);
    return { message: result };
  }


  /**
  * @api {delete} /question/:id Delete questions
  * @apiName DeleteQuestion
  * @apiGroup Question
  * @apiPermission admin
  * @apiDescription Delete all the questions from a given quiz
  *
  * @apiHeader {String} authorization Bearer token.
  * @apiPermission admin
  * 
  * @apiParam {String} id ID of the quiz.
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": "Questions successfully deleted",
  *     }
  *
  * @apiError InternalServerError.
  *
  */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async deleteQuestions(@Param("id") id: Mongoose.Schema.Types.ObjectId) {
    const result = await this.questionService.deleteAll(id);
    return { message: result };
  }
}
