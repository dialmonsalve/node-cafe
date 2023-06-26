import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import { Category, Product, User } from '../models';

const permittedCollections = [
  'users',
  'categories',
  'products',
  'roles'
]

const searUsers = async (term: string, res: Response) => {

  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const [users, total] = await Promise.all([
    User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    }),
    User.countDocuments({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    }),
  ])

  return res.json({
    total,
    results: users
  })
}

const searCategories = async (term: string, res: Response) => {

  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const [categories, total] = await Promise.all([
    Category.find({
      $or: [{ name: regex, status: true }],
    }),
    Category.countDocuments({
      $or: [{ name: regex, status: true }],
    }),
  ])

  return res.json({
    total,
    results: categories
  })
}

const searProducts = async (term: string, res: Response) => {

  const isMongoId = isValidObjectId(term)

  if (isMongoId) {
    const products = await Product.findById(term).populate('category', 'name');
    return res.json({
      results: products ? [products] : []
    })
  }

  const regex = new RegExp(term, 'i')

  const [products, total] = await Promise.all([
    Product.find({
      $or: [{ name: regex, status: true }]
    }).populate('category', 'name'),
    Product.countDocuments({
      $or: [{ name: regex, status: true }],
    }),
  ])

  return res.json({
    total,
    results: products
  })
}

const search = async (req: Request, res: Response) => {

  const { collection, term } = req.params

  if (!permittedCollections.includes(collection)) {

    return res.status(400).json({
      msg: `Collections permitted are ${permittedCollections}`
    });
  };

  switch (collection) {
    case 'users':
      searUsers(term, res)
      return;
    case 'categories':
      searCategories(term, res)
      return;
    case 'products':
      searProducts(term, res)
      return;

    default:
      return res.status(500).json({

      });
  }

}

export {
  search
}