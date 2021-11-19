const Review = require('../models/Review');
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { checkPermissions } = require('../utils');

const createReview = async (req, res) => {
  console.log(req.body);
  const productId = req.body.product;

  // check if there is a product
  const isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  // check id the user has already submitted a review
  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      `Already submitted review for this product`
    );
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  res.status(StatusCodes.CREATED).json({ review });
};

const getAllReviews = async (req, res) => {
  res.send('get all reviews');
};

const getSingleReview = async (req, res) => {
  res.send('get single review');
};

const updtateReview = async (req, res) => {
  res.send('update review');
};

const deleteReview = async (req, res) => {
  res.send('delete review');
};

module.exports = {
  createReview,
  getAllReviews,
  getSingleReview,
  updtateReview,
  deleteReview,
};
