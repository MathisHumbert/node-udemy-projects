const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  console.log(req.body);
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${req.params.id}`);
  }

  await product.remove();

  res.status(StatusCodes.OK).json({ msg: 'Success! Product Removed.' });
};

const uploadImage = async (req, res) => {
  res.send('upload image');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
