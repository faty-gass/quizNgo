import * as Mongoose from "mongoose";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { DonequizService } from "./donequiz.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller("donequiz")
export class DonequizController {
  constructor(private readonly DonequizService: DonequizService) { }


  /**
  * @api {post} /donequiz Saving quiz result
  * @apiName SaveQuiz
  * @apiGroup DoneQuiz
  * @apiDescription Saving the result of a quiz done by one user.
  *
  * @apiParam {String} user_id ID of the user.
  * @apiParam {String} quizz_id ID of the quiz.
  * @apiParam {Number} score Total xps won in the quiz.
  * @apiParam {Number} success_rate Percentage of good answers.
  *
  * @apiSuccess {String} id ID of the finished quiz.
  * @apiSuccess {String} quizz_id ID of the quiz.
  * @apiSuccess {String} user_id ID of the user.
  * @apiSuccess {Number} score Total xps won by the user in the quiz.
  * @apiSuccess {Number} success_rate Percentage of good answers.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 201 OK
  *     {
  *       "id": "5f843ce9de4ad118bcbf8135",
  *       "quizz_id": "5f7f3dac7a1445090cc23e75",
  *       "user_id" : "5f7d8f5aef1ca604b56f8ca5",
  *       "score" : 60,
  *       "success_rate": 50,
  *     }
  *
  * @apiError InternalServorError Database error while creating new entry.
  *
  */
  @Post()
  async addEntry(
    @Body("user_id") userId: Mongoose.Schema.Types.ObjectId,
    @Body("quizz_id") quizId: Mongoose.Schema.Types.ObjectId,
    @Body("score") score: Number,
    @Body("success_rate") success_rate: Number,
  ) {
    const result = await this.DonequizService.enterQuiz(
      userId,
      quizId,
      score,
      success_rate,
    );
    return result;
  }


  /**
  * @api {get} /donequiz Show all done quiz
  * @apiName GetAllDoneQuiz
  * @apiGroup DoneQuiz
  * @apiDescription Showing all the quiz already done.
  *
  *
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       {
  *         "id": "5f843ce9de4ad118bcbf8135",
  *         "quizz_id": "5f7f3dac7a1445090cc23e75",
  *         "user_id" : "5f7d8f5aef1ca604b56f8ca5",
  *         "score" : 60,
  *         "success_rate": 50,
  *       },
  *       ...
  *     ]
  *
  * @apiError InternalServorError.
  *
  */
  @Get()
  async getAll() {
    const result = await this.DonequizService.getAllQuiz();
    return result;
  }


  /**
  * @api {get} /donequiz/user/:id Show user done quiz
  * @apiName GetUserDoneQuiz
  * @apiGroup DoneQuiz
  * @apiDescription Showing all the quiz already done by a given user.
  *
  * @apiHeader {String} authorization Bearer token.
  * 
  * @apiParam {String} id ID of the user.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
  *       {
  *         "id": "5f843ce9de4ad118bcbf8135",
  *         "quizz_id": {
  *            "id": "5f7f3dac7a1445090cc23e75",
  *            "avg_rating": 4.666666666666667,
  *            "is_published": true,
  *            "name": "Nico Facile 2",
  *            "category": {
  *                "id": "5f7efda4c828e01d223fd057",
  *                "name": "Javascript"
  *             }
  *            "difficulty": "Facile",
  *            "bonus_time": 10,
  *            "bonus_xp": 100,
  *            "createdAt": "2020-10-08T16:26:20.517Z",
  *            "updatedAt": "2020-10-19T08:08:32.179Z"
  *          },
  *         "user_id" : "5f7d8f5aef1ca604b56f8ca5",
  *         "score" : 60,
  *         "success_rate": 50,
  *       },
  *       ...
  *     ]
  *
  * @apiError InternalServorError.
  *
  */
  //@UseGuards(JwtAuthGuard)
  @Get("user/:id")
  async getUserQuiz(@Param("id") userId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.getOneUserQuiz(userId);
    return result;
  }


  /**
* @api {get} /donequiz/rank/:id Show user rank
* @apiName GetUserRank
* @apiGroup DoneQuiz
* @apiDescription Showing the score rank of a given user.
*
* @apiHeader {String} authorization Bearer token.
*
* @apiParam {String} id ID of the user.
* 
* @apiSuccess {String} user_id ID of the user.
* @apiSuccess {String} rank Rank of the user.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*       {
*         "user_id": "5f845e9c3637511f9875b34f",
*         "rank": 3
*       }
* 
* @apiError InternalServorError
* 
*/
  @UseGuards(JwtAuthGuard)
  @Get("rank/:id")
  async getUserRank(@Param("id") userId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.getOneUserRank(userId);
    return result;
  }

  // @Get(":id")
  // async getOneQuiz(@Param("id") quizId: Mongoose.Schema.Types.ObjectId) {
  //   console.log("YYYYY");
  //   const result = await this.DonequizService.getOneQuiz(quizId);
  //   return result;
  // }

  /**
  * @api {patch} /donequiz/:id Update one quiz done
  * @apiName UpdateDoneQuiz
  * @apiGroup DoneQuiz
  * @apiDescription Update a quiz already done.
  * 
  * @apiHeader {String} authorization Bearer token.
  *
  * @apiParam {String} id ID of the quiz done.
  * @apiParam {Number} score  New total of xps won.
  * @apiParam {Number} success_rate New percentage of good answers.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": "DoneQuiz successfully updated",
  *     }
  *
  * @apiError NotFoundError Quiz not found.
  */
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  async update(
    @Param("id") quizId: Mongoose.Schema.Types.ObjectId,
    @Body("score") score: Number,
    @Body("success_rate") success_rate: Number,
  ) {
    const result = await this.DonequizService.updateQuiz(
      quizId,
      score,
      success_rate,
    );
    return result;
  }



  /**
  * @api {delete} /donequiz/:id Delete one quiz done
  * @apiName DeleteDoneQuiz
  * @apiGroup DoneQuiz
  * @apiDescription Delete a quiz already done.
  *
  * @apiHeader {String} authorization Bearer token.
  * 
  * @apiParam {String} id ID of the quiz done.
  * 
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message": "DoneQuiz successfully deleted",
  *     }
  * 
  * @apiError NotFoundError Quiz not found.
  */
  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  async delete(@Param("id") quizId: Mongoose.Schema.Types.ObjectId) {
    const result = await this.DonequizService.delete(quizId);
    return { message: result };
  }
}
