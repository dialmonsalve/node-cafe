import { Schema, model } from 'mongoose';
import { IProduct } from '../utilities/types';

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    unique:true
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
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  description: { type: String },
  stock: { type: Boolean, default: true }
})

ProductSchema.methods.toJSON = function () {
  const { __v,  ...product } = this.toObject();

  return product;
}

export default model('Product', ProductSchema);
