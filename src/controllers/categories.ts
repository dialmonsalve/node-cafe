import { Request, Response } from 'express';
import { Category } from '../models';
import { AuthenticatedRequest, ICategory } from '../utilities/types';

const getCategories = async (req: Request, res: Response) => {

  const { limit = 5, from = 0 } = req.query;

  const [total, categories] = await Promise.all([
    Category.countDocuments({ status: true }),
    Category.find({ status: true })
      .populate('user', 'name')
      .skip(Number(from))
      .limit(Number(limit))
      .exec()
  ]);

  return res.json({
    total,
    categories
  })

}

const getCategory = async (req: AuthenticatedRequest, res: Response) => {

  const { id } = req.params

  const category = await Category.findById(id).populate('user', 'name').exec();

  return res.json(category)
}

const createCategory = async (req: AuthenticatedRequest, res: Response) => {

  const name = req.body.name.toUpperCase();

  const categoryBD = await Category.findOne({ name }) as ICategory;

  if (categoryBD) {
    return res.status(400).json({
      msg: `Category ${categoryBD.name} already exists`
    })
  };

  const data = {
    name,
    user: req.user?._id
  }

  const category = new Category(data);

  await category.save();

  return res.status(201).json({
    category
  })

}

const updateCategory = async (req: AuthenticatedRequest, res: Response) => {

  const { id } = req.params;

  const { _id, status, user, ...data } = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user?._id;

  const category = await Category.findByIdAndUpdate(id, data, { new: true })

  return res.json(category);
}

const deleteCategory = async (req: Request, res: Response) => {

  const { id } = req.params;

  // Delete on database
  // const user = await User.findByIdAndDelete(id)

  // Logic Delete
  const category = await Category.findByIdAndUpdate(id, { status: false, new: true });

  return res.json(category);

}

export {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
}

