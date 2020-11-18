import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import * as Mongoose from 'mongoose';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";


@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) { }


  /**
   * @api {post} /comments Add a comment
   * @apiName CreateComment
   * @apiGroup Comments
   * 
   * @apiHeader {String} authorization Bearer token.
   * 
   * @apiParam {String} user_id ID of the user posting the comment.
   * @apiParam {String} quizz_id ID of the quiz where the comment was added.
   * @apiParam {String} comment Content of the comment.
   * 
   * @apiSuccess {String} id ID of the created comment.
   * @apiSuccess {String} user_id ID of the user.
   * @apiSuccess {String} quizz_id ID of the quiz.
   * @apiSuccess {String} comment Contenet of the comment.
   * 
   * @apiSuccessExample Success-Response:
  *     HTTP/1.1 201 OK
  *     {
  *       "id": "5f85cdb33bee723d0ae5a1d4",
  *       "user_id": "5f845e9c3637511f9875b34f",
  *       "quizz_id": "5f7f00e8c828e01d223fd058",
  *       "comment": "First comment quiz laravel"
  *     }
   * 
   * @apiError InternalServorError Database error while creating new entry.
   * 
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async addComment(
    @Body('user_id') user_id: Mongoose.Schema.Types.ObjectId,
    @Body('quizz_id') quizz_id: Mongoose.Schema.Types.ObjectId,
    @Body('comment') comment: string,
  ) {
    const result = await this.commentService.createComment(user_id, quizz_id, comment);
    return result
  }


  /**
  * @api {get} /comments Get all comments
  * @apiName GetComments
  * @apiGroup Comments
  * 
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *    [
  *      {
  *       "id": "5f85cdb33bee723d0ae5a1d4",
  *       "user_id": "5f845e9c3637511f9875b34f",
  *       "quizz_id": "5f7f00e8c828e01d223fd058",
  *       "comment": "First comment quiz laravel"
  *      },
  *     ...
  *   ]
  * 
  */
  @Get()
  async getAllComments() {
    const result = await this.commentService.getComments();
    return result
  }


  /**
  * @api {get} /comments/quizz/:id Get quiz comments
  * @apiName GetQuizComments
  * @apiGroup Comments
  * @apiDescription Get all the comments for a specific quiz
  *
  * @apiParam {String} id ID of the quiz.
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *    [
  *      {
  *       "id": "5f85cdb33bee723d0ae5a1d4",
  *       "user_id": "5f845e9c3637511f9875b34f",
  *       "quizz_id": "5f7f00e8c828e01d223fd058",
  *       "comment": "First comment quiz laravel"
  *      },
  *     ...
  *   ]
  *
  */
  @Get('quizz/:id')
  async getQuizComments(
    @Param('id') quizzId: Mongoose.Schema.Types.ObjectId
  ) {
    const result = await this.commentService.getQuizComment(quizzId);
    return result
  }


  /**
  * @api {patch} /comments/:id Update comment
  * @apiName UpdateComment
  * @apiGroup Comments
  * 
  * @apiHeader {String} authorization Bearer token.
  * @apiParam {String} id ID of the comment
  * @apiParam {String} comment New content of the comment
  *
  * @apiSuccessExample Success-Response:
  *    HTTP/1.1 200 OK
  *      {
  *       "message": ""Comment successfully updated !""
  *      },
  *     
  *
  */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateComment(
    @Param('id') commentId: Mongoose.Schema.Types.ObjectId,
    @Body('comment') comment: string
  ) {
    const result = await this.commentService.updateComment(commentId, comment);
    return { message: result }
  }


  /**
   * @api {delete} /comments/:id
   * @apiName DeleteComment
   * @apiGroup Comments
   * 
   * @apiHeader {String} authorization Bearer token.
   * 
   * @apiParam {String} id ID of the comment
   * 
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *      {
   *       "message": ""Comment successfully deleted !""
   *      },
   *  
   * @apiError NotFoundError Comment not Found
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteComment(
    @Param('id') commentId: Mongoose.Schema.Types.ObjectId
  ) {
    const result = await this.commentService.deleteComment(commentId);
    return { message: result }
  }
}
