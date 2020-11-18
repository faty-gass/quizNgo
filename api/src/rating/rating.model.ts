import * as Mongoose from 'mongoose';

export const RatingRef = 'RatingRef';
export const RatingSchema = new Mongoose.Schema({
  user_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quizz_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true },
  rating: { type: Number, required: true },
}, { timestamps: true })

export interface Rating extends Mongoose.Document {
  user_id: Mongoose.Schema.Types.ObjectId;
  quizz_id: Mongoose.Schema.Types.ObjectId;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}