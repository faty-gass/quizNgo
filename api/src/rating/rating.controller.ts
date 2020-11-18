import * as Mongoose from 'mongoose';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RatingService } from './rating.service';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("ratings")
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  /**
   * @api {post} /ratings Create a new rating
   * @apiName addRating
   * @apiGroup Ratings
   * 
   * @apiHeader {String} authorization Bearer token.
   * 
   * @apiParam {String} quizz_id Id of the quiz
   * @apiParam {String} user_id Id of the user
   * @apiParam {Number} rating Rating given by the user to the quiz
   * 
   * @apiSuccess {Number} avg_rating Average rating of the quiz
   * @apiSuccess {Boolean} is_published Published status
   * @apiSuccess {String} _id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id of the quiz's category
   * @apiSuccess {String} difficulty Quiz's difficulty
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Timestamp} createdAt Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updatedAt Timestamp of the quiz's last modification
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
   *      {
            "avg_rating": 3.4,
            "is_published": true,
            "_id": "5f7f4c46eb4a5b3d2eaa1e34",
            "name": "Test avec 2 questions",
            "category": "5f7f4bf1eb4a5b3d2eaa1e33",
            "difficulty": "Difficile",
            "bonus_time": 1,
            "bonus_xp": 888,
            "createdAt": "2020-10-09T14:07:17.769Z",
            "updatedAt": "2020-10-20T17:26:49.037Z"
          }
   *    ]
   * 
   * @apiErrorExample Error-Response:
   *  {
   *    "message": "Quiz was already rated !"
   *  }
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addRating(
    @Body("quizz_id") quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body("user_id") user_id: Mongoose.Schema.Types.ObjectId,
    @Body("rating") rating: number,
  ) {
    const result = await this.ratingService.createRating(
      quizz_id,
      user_id,
      rating,
    );
    return result;
  }

  /**
   * @api {post} /ratings/one Get one user rating
   * @apiName getRating
   * @apiGroup Ratings
   * @apiDescription Get one specific rating from one specific user
   *
   * @apiParam {String} quizz_id Id of the quiz
   * @apiParam {String} user_id Id of the user
   *
   * @apiSuccess {String} id Id of the rating
   * @apiSuccess {Number} rating Rating of the quiz
   * @apiSuccess {Timestamp} createdAt Timestamp of the rating's creation
   *
   * @apiSuccessExample Success-Response:
   *   HTTP/1.1 201 OK
   *   {
   *      "id": "5f8ffa34b3815d03d1d82bfb",
          "rating": 4,
          "created_at": "2020-10-21T09:07:00.489Z"
   *   }
   */
  @Post("one")
  async getRating(
    @Body("quizz_id") quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body("user_id") user_id: Mongoose.Schema.Types.ObjectId,
  ) {
    const result = await this.ratingService.getOneRating(quizz_id, user_id);
    return result;
  }

  /**
   * @api {get} /ratings Get all ratings
   * @apiName getAllRatings
   * @apiGroup Ratings
   *
   * @apiSuccess {String} _id Id of the rating
   * @apiSuccess {String} quizz_id Id of the quiz
   * @apiSuccess {String} user_id Id of the user
   * @apiSuccess {Number} rating Rating of the quiz
   * @apiSuccess {Timestamp} createdAt Timestamp of the rating's creation
   * @apiSuccess {Timestamp} updatedAt Timestamp of the rating's last modification
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
   *      {
            "_id": "5f8745c82cb5147334e5e656",
            "quizz_id": "5f7f4c46eb4a5b3d2eaa1e34",
            "user_id": "5f85e5c90fd9ad51bb2b0c92",
            "rating": 5,
            "createdAt": "2020-10-14T18:39:04.551Z",
            "updatedAt": "2020-10-14T18:39:04.551Z",
          }
   *    ]
   */
  @Get()
  async getAllRatings() {
    const result = await this.ratingService.getRatings();
    return result;
  }

  /**
   * @api {get} /ratings/:id Get average ratings of a specific quiz
   * @apiName getavgRating
   * @apiGroup Ratings
   *
   * @apiSuccess {Number} avg_rating Average rating of the quiz
   * @apiSuccess {Boolean} is_published Published status
   * @apiSuccess {String} _id Id of the quiz
   * @apiSuccess {String} name Name of the quiz
   * @apiSuccess {String} category Id of the quiz's category
   * @apiSuccess {String} difficulty Quiz's difficulty
   * @apiSuccess {Number} bonus_time Max time in minutes to get bonus XPs
   * @apiSuccess {Number} bonus_xp XPs amount if quiz done under bonus time
   * @apiSuccess {Timestamp} createdAt Timestamp of the quiz's creation
   * @apiSuccess {Timestamp} updatedAt Timestamp of the quiz's last modification
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    [
   *      {
            "avg_rating": 3.4,
            "is_published": true,
            "_id": "5f7f4c46eb4a5b3d2eaa1e34",
            "name": "Test avec 2 questions",
            "category": "5f7f4bf1eb4a5b3d2eaa1e33",
            "difficulty": "Difficile",
            "bonus_time": 1,
            "bonus_xp": 888,
            "createdAt": "2020-10-09T14:07:17.769Z",
            "updatedAt": "2020-10-20T17:26:49.037Z"
          }
   *    ]
   */
  @Get(":id")
  async getavgRating(@Param("id") quizzId: Mongoose.Schema.Types.ObjectId) {
    const result = this.ratingService.updateAvg(quizzId);
    return result;
  }
}
