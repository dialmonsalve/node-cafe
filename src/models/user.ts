import { Schema, model } from "mongoose";
import { IUser } from "../utilities/types";

const UserSchema = new Schema<IUser>({

  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
  },
  img: {
    type: String,
  },

  rol: {
    type: String,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: true,
  },
})

export default model('User', UserSchema);