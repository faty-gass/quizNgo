import * as Mongoose from "mongoose";

export const UserRef = 'UserRef';

export const UserSchema = new Mongoose.Schema({

  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [2, "Le nom doit contenir au moins 2 caractères."],
    // match: [/^{2,20}$/, "Le nom doit contenir au moins 2 caractères."], // ne marche pas ???
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email invalide.",
    ],
  },
  password: {
    type: String,
    required: true,
  },
  favorites: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Quizz" }],
  score: { type: Number, default: 0 },
  role: { type: String, default: "user" },
});

export interface User extends Mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  favorites: [Mongoose.Schema.Types.ObjectId];
  score: Number;
  role: string;
}


