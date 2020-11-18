import * as Mongoose from 'mongoose';

export const CommentRef = 'CommentRef';
export const CommentSchema = new Mongoose.Schema({
  user_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizz_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true },
  comment: { type: String, required: true },
}, { timestamps: true })

export interface Comment extends Mongoose.Document {
  user_id: Mongoose.Schema.Types.ObjectId;
  quizz_id: Mongoose.Schema.Types.ObjectId;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

}