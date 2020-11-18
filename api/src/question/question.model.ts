import * as Mongoose from 'mongoose';


export const QuestionSchema = new Mongoose.Schema({
  quizz_id: { type: Mongoose.Schema.Types.ObjectId, ref: 'Quizz', required: true },
  xps: { type: Number, required: true },
  question: { type: String, required: true },
  answers: [{ type: Object, required: true }],
  is_multi: { type: Boolean}

});

export interface Answer {
  answer: string,
  is_correct: boolean
}

export interface Question extends Mongoose.Document {
  quizz_id: Mongoose.Schema.Types.ObjectId;
  xps: Number;
  question: String;
  is_multi: Boolean;
  answers: [Answer];
}
