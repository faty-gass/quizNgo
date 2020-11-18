import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as Mongoose from "mongoose";
import { Model } from "mongoose";
import { Comment } from "./comment.model";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel("Comment") private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(
    user_id: Mongoose.Schema.Types.ObjectId,
    quizz_id: Mongoose.Schema.Types.ObjectId,
    comment: string,
  ) {
    const newComment = new this.commentModel({ user_id, quizz_id, comment });
    if (newComment) {
      newComment.save();
      return newComment._id;
    } else {
      throw new Error("Error in comment creation !");
    }
  }

  async getComments() {
    const comments = await this.commentModel.find().exec();
    return comments.map(comment => ({
      id: comment._id,
      user_id: comment.user_id,
      quizz_id: comment.quizz_id,
      comment: comment.comment,
    }));
  }

  async countOneQuizComments() {
    const count = await this.commentModel.aggregate([
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

  async getQuizComment(quizzId: Mongoose.Schema.Types.ObjectId) {
    const comments = await this.commentModel
      .find({ quizz_id: quizzId })
      .populate("user_id")
      .sort({ createdAt: "desc" })
      .exec();
    return comments.map(comment => ({
      id: comment._id,
      user_id: comment.user_id,
      quizz_id: comment.quizz_id,
      comment: comment.comment,
      created_at: comment.createdAt,
    }));
  }

  async updateComment(
    commentId: Mongoose.Schema.Types.ObjectId,
    newComment: string,
  ) {
    const comment = await this.commentModel.findById(commentId).exec();
    if (comment) {
      comment.comment = newComment;
      comment.save();
      return "Comment successfully updated !";
    }
  }

  async deleteComment(id: Mongoose.Schema.Types.ObjectId) {
    const comment = await this.commentModel.deleteOne({ _id: id }).exec();
    if (comment.deletedCount === 0) {
      throw new NotFoundException("Comment not found !");
    } else {
      return "Comment successfully deleted !";
    }
  }
}
