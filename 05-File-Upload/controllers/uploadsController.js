const { StatusCodes } = require('http-status-codes');
const path = require('path');

const uploadProductImage = async (req, res) => {
  const productImage = req.files.image;

  // create the image path
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );

  //  move the image to the path created
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `uploads/${productImage.name}` } });
};

module.exports = {
  uploadProductImage,
};
