import {Document, model, Schema} from 'mongoose';

export const schema = new Schema({
  email: {
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  }
});

export interface IUser {
  _id: string;
  email: string;
  password?: string;
}

export interface IUser extends Document {
    email: string;
    password?: string;
}

export const User = model<IUser>('User', schema);
