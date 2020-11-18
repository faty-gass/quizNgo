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
import { QuizzService } from "./quizz.service";
import { hasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from 'src/auth/roles.guards';

@Controller("quizz")
export class QuizzController {
  constructor(private readonly quizzService: QuizzService) { }

  /**
   * @api {post} /quizz Create a new quiz
   * @apiName addQuizz
   * @apiGroup Quizz
   * 
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   *
   * @apiParam {String} name Quiz name
   * @apiParam {String} category Id of the quiz category
   * @apiParam {String="Facile", "Moyen", "Difficile"} difficulty Quiz difficulty level
   * @apiParam {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiParam {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiParam {Boolean} [is_published="false"] Published status with default false
   *
   * @apiSuccess {String} id Id of the new quiz
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 201 OK
   *   {
   *       "id": "5f8ee...382b7"
   *   }
   * 
   * @apiError Error
   * 
   * @apiErrorExample Error-Response:
   * HTTP/1.1 XXX XXX
   * {
   *   "XXX": "XXX"
   * }

   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async addQuizz(
    @Body("name") name: string,
    @Body("category") category: Mongoose.Schema.Types.ObjectId,
    @Body("difficulty") difficulty: String,
    @Body("bonus_time") bonus_time: Number,
    @Body("bonus_xp") bonus_xp: Number,
    @Body("is_published") is_published: Boolean,
  ) {
    const result = await this.quizzService.createQuizz(
      name,
      category,
      difficulty,
      bonus_time,
      bonus_xp,
      is_published,
    );
    return { id: result };
  }

  /**
   * @api {get} /quizz Get all quizz
   * @apiName showAllQuiz
   * @apiGroup Quizz
   * 
   * @apiSuccess {String} id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id & Name of the quiz's category
   * @apiSuccess {String} difficulty Difficulty level of the quiz
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Number} avg_rating Average rating based on user's ratings
   * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
   * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
          {
              "id": "5f872...aa9f4",
              "name": "My Wonderful Quiz",
              "category": {
                  "_id": "5f7f4...a1e33",
                  "name": "Naxst JS",
              },
              "difficulty": "Moyen",
              "bonus_time": 1,
              "bonus_xp": 100,
              "avg_rating": 4.333333333333333,
              "is_published": true,
              "created_at": "2020-10-14T16:50:43.383Z",
              "updated_at": "2020-10-18T16:40:35.623Z"
          }
        ]
   */
  @Get()
  async showAllQuizz() {
    const result = await this.quizzService.showQuizzes();
    return result;
  }

  /**
   * @api {get} /quizz/published Get all published quizz
   * @apiName showPublishedQuizz
   * @apiGroup Quizz
   * 
   * @apiSuccess {String} id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id & Name of the quiz's category
   * @apiSuccess {String} difficulty Difficulty level of the quiz
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Number} avg_rating Average rating based on user's ratings
   * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
   * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
          {
              "id": "5f872...aa9f4",
              "name": "My Wonderful Quiz",
              "category": {
                  "_id": "5f7f4...a1e33",
                  "name": "Naxst JS",
              },
              "difficulty": "Moyen",
              "bonus_time": 1,
              "bonus_xp": 100,
              "avg_rating": 4.333333333333333,
              "is_published": true,
              "created_at": "2020-10-14T16:50:43.383Z",
              "updated_at": "2020-10-18T16:40:35.623Z"
          }
        ]
   */
  @Get("/published")
  async showPublishedQuizz() {
    const result = await this.quizzService.showPublishedQuizzes();
    return result;
  }


  /**
   * @api {get} /quizz/stats Get all quizz stats
   * @apiName getAllQuizzWithStats
   * @apiGroup Quizz
   * @apiDescription Get all quizz with playcount (unreliable) and success ratio additional stats
   * 
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   * 
   * @apiSuccess {String} id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id & Name of the quiz's category
   * @apiSuccess {String} difficulty Difficulty level of the quiz
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Number} avg_rating Average rating based on user's ratings
   * @apiSuccess {Number} playcount UNRELIABLE (playcount of the quiz, but doesn't considers unregisred users games nor registred users multiple games)
   * @apiSuccess {Number} success_ratio Average success ratio based on users results
   * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
   * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
          {
              "id": "5f7f4c46eb4a5b3d2eaa1e34",
              "name": "Test avec 2 questions",
              "category": {
                  "_id": "5f7f4bf1eb4a5b3d2eaa1e33",
                  "name": "Naxst JS",
                  "__v": 0
              },
              "difficulty": "Difficile",
              "bonus_time": 1,
              "bonus_xp": 100,
              "avg_rating": 3.3333333333333335,
              "playcount": 6,
              "success_ratio": 85,
              "is_published": true,
              "created_at": "2020-10-09T14:07:17.769Z",
              "updated_at": "2020-10-16T17:36:11.589Z"
          }
        ]
   */
  @hasRoles("admin")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get("stats")
  async getAllQuizzWithStats() {
    const result = await this.quizzService.getQuizzesWithStats();
    return result;
  }


  /**
   * @api {get} /quizz/:id Get one quiz by Id
   * @apiName showOneQuizz
   * @apiGroup Quizz
   * @apiDescription Get one quiz by Id
   * 
   * @apiParam {Number} id Quiz unique ID
   * 
   * @apiSuccess {String} id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id & Name of the quiz's category
   * @apiSuccess {String} difficulty Difficulty level of the quiz
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Number} avg_rating Average rating based on user's ratings
   * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
   * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
          {
              "id": "5f7f4c46eb4a5b3d2eaa1e34",
              "name": "Test avec 2 questions",
              "category": {
                  "_id": "5f7f4bf1eb4a5b3d2eaa1e33",
                  "name": "Naxst JS",
                  "__v": 0
              },
              "difficulty": "Difficile",
              "bonus_time": 1,
              "bonus_xp": 100,
              "avg_rating": 3.3333333333333335,
              "is_published": true,
              "created_at": "2020-10-09T14:07:17.769Z",
              "updated_at": "2020-10-16T17:36:11.589Z"
          }
        ]
   */
  @Get(":id")
  async showOneQuizz(@Param("id") quizzId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.quizzService.showOneQuizz(quizzId);
    return result;
  }

  /**
   * @api {patch} /quizz/:id Update an existing quiz
   * @apiName updateQuizz
   * @apiGroup Quizz
   *
   * @apiHeader {String} authorization Bearer token.
   * 
   * @apiParam {Number} id Quiz unique ID
   * @apiParam {String} [name] Quiz name
   * @apiParam {String} [category] Id of the quiz category
   * @apiParam {String="Facile", "Moyen", "Difficile"} [difficulty] Quiz difficulty level
   * @apiParam {Number} [bonus_time] Max time in minutes to get bonus XPs
   * @apiParam {Number} [bonus_xp] XPs amount if quiz done under bonus time
   * @apiParam {Boolean} [is_published="false"] Published status with default false
   *
   * @apiSuccess {String} message "Quiz successfully updated"
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 201 OK
   *   {
          "message": " Quiz successfully updated"
   *   }
   *
   * @apiError Error
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 XXX XXX
   * {
   *   "XXX": "XXX"
   * }
   */
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async updateQuizz(
    @Param("id") quizzId: Mongoose.Schema.Types.ObjectId,
    @Body("name") name: string,
    @Body("category") category: Mongoose.Schema.Types.ObjectId,
    @Body("difficulty") difficulty: String,
    @Body("bonus_time") bonus_time: Number,
    @Body("bonus_xp") bonus_xp: Number,
    @Body("avg_rating") avg_rating: Number,
    @Body("is_published") is_published: Boolean,
  ) {
    const result = await this.quizzService.update(
      quizzId,
      name,
      category,
      difficulty,
      bonus_time,
      bonus_xp,
      avg_rating,
      is_published,
    );
    return { message: result };
  }

  /**
   * @api {delete} /quizz/:id Delete one quiz
   * @apiName deleteQuizz
   * @apiGroup Quizz
   *
   * @apiHeader {String} authorization Bearer token.
   * @apiPermission admin
   * 
   * @apiParam {Number} id Quiz unique ID
   *
   * @apiSuccess {String} message "Quiz successfully deleted"
   * 
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 201 OK
   *   {
          "message": " Quiz successfully deleted"
   *   }
   * 
   * @apiError Error
   *
   * @apiErrorExample Error-Response:
   * HTTP/1.1 XXX XXX
   * {
   *   "XXX": "XXX"
   * }
   */
  //@hasRoles("admin")
  //@UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(":id")
  async deleteQuizz(@Param("id") quizzId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.quizzService.delete(quizzId);
    return { message: result };
  }



  /**
   * @api {post} /quizz/search Search quiz
   * @apiName searchAll
   * @apiGroup Quizz
   * 
   * @apiParam {String} Search string
   * 
   * @apiSuccess {String} id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id & Name of the quiz's category
   * @apiSuccess {String} difficulty Difficulty level of the quiz
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Number} avg_rating Average rating based on user's ratings
   * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
   * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
    *     {
            "id": "5f7f3dac7a1445090cc23e75",
            "name": "Nico Facile 2",
            "category": {
                "_id": "5f7efda4c828e01d223fd057",
                "name": "Javascript",
                "__v": 0
            },
            "difficulty": "Facile",
            "bonus_time": 10,
            "bonus_xp": 100,
            "avg_rating": 4.666666666666667,
            "is_published": true,
            "created_at": "2020-10-08T16:26:20.517Z",
            "updated_at": "2020-10-19T08:08:32.179Z"
          }
   *    ]
   */
  @Post("/search")
  async searchAll(
    @Body("query") query?: string,
    @Body("level") level?: string,
    @Body("category") category?: Mongoose.Schema.Types.ObjectId,
    @Body("sort") sort?: string,
  ) {
    const result = await this.quizzService.searchAll(
      query,
      level,
      category,
      sort,
    );
    return result;
  }


  /**
  * @api {get} /quizz/suggest/:id Suggest a quiz
  * @apiName QuizSuggestion
  * @apiGroup Quizz
  * @apiDescription Suggest a quiz to a given user according to the quizz they didn't do yet
  *
  * @apiHeader {String} authorization Bearer token.
  * 
  * @apiParam {String} id ID of the user
  *
  * @apiSuccess {String} id Id of the quiz
  * @apiSuccess {String} name Name of the quiz
  * @apiSuccess {String} category Id & Name of the quiz's category
  * @apiSuccess {String} difficulty Difficulty level of the quiz
  * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
  * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
  * @apiSuccess {Number} avg_rating Average rating based on user's ratings
  * @apiSuccess {Boolean} is_published TRUE : quiz is published, FALSE : quiz is NOT published
  * @apiSuccess {Timestamp} created_at Timestamp of the quiz's creation
  * @apiSuccess {Timestamp} updated_at Timestamp of the quiz's last modification
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *    [
  *     {
          "id": "5f7f3dac7a1445090cc23e75",
          "name": "Nico Facile 2",
          "category": {
              "_id": "5f7efda4c828e01d223fd057",
              "name": "Javascript",
              "__v": 0
          },
          "difficulty": "Facile",
          "bonus_time": 10,
          "bonus_xp": 100,
          "avg_rating": 4.666666666666667,
          "is_published": true,
          "created_at": "2020-10-08T16:26:20.517Z",
          "updated_at": "2020-10-19T08:08:32.179Z"
        }
  *    ]
  
  * @apiError NotFound No Match Found
  */
  @UseGuards(JwtAuthGuard)
  @Get('/suggest/:id')
  async suggestQuiz(
    @Param('id') userId: Mongoose.Schema.Types.ObjectId,
  ) {
    const result = await this.quizzService.suggestQuiz(userId);
    return result
  }
}
