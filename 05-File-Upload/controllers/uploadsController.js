const { StatusCodes } = require('http-status-codes');
const path = require('path');
const CustomError = require('../errors');

const uploadProductImage = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No file Uploaded');
  }

  const productImage = req.files.image;

  // check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please Upload Image');
  }

  // check size
  const maxSize = 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError('Please upload image smaller 1KB');
  }

  // create the image path
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  //  move the image to the path created
  await productImage.mv(imagePath);

  // return the path to the front end
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
