import { Schema, model } from "mongoose";
import { ICategory } from "../utilities/types";

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
})

CategorySchema.methods.toJSON = function () {
  const { __v, status, ...category } = this.toObject();

  return category;
}

export default model('Category', CategorySchema);