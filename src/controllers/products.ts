import { Request, Response } from 'express';
import { Product } from '../models';
import { AuthenticatedRequest, IProduct, } from '../utilities/types';

const getProducts = async (req: Request, res: Response) => {

  const { limit = 5, from = 0 } = req.query;

  const [total, products] = await Promise.all([
    Product.countDocuments({ status: true }),
    Product.find({ status: true })
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(from))
      .limit(Number(limit))
      .exec()
  ]);

  return res.json({
    total,
    products
  })

}

const getProduct = async (req: AuthenticatedRequest, res: Response) => {

  const { id } = req.params;

  const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')
    .exec();

  return res.json(product);
}

const createProduct = async (req: AuthenticatedRequest, res: Response) => {

  const { status, user, ...body } = req.body;

  const productDB = await Product.findOne({ name: body.name }) as IProduct;

  if (productDB) {
    return res.status(400).json({
      msg: `Product ${productDB.name} already exists`
    })
  };

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user?._id
  }

  const product = new Product(data);

  await product.save();

  return res.status(201).json(product)

}

const updateProduct = async (req: AuthenticatedRequest, res: Response) => {

  const { id } = req.params;

  const { _id, status, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user?._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true })

  return res.json(product);
}

const deleteProduct = async (req: Request, res: Response) => {

  const { id } = req.params;

  // Delete on database
  // const user = await User.findByIdAndDelete(id)

  // Logic Delete
  const productDeleted = await Product.findByIdAndUpdate(id, { status: false, new: true });

  return res.json(productDeleted);

}

export {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
}

