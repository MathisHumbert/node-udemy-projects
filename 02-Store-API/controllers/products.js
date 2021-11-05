// get the model
const { Query } = require('mongoose');
const Products = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const search = 'a';
  //const products = await Products.find(req.query);
  // const products = await Products.find({
  //   name: { $regex: search, $options: 'i' },
  // });
  //const products = await Products.find({}).sort('-name price');
  const products = await Products.find({}).select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // refractor for mongoose v5
  // we find name on the query = ?url
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  // find by featured
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  // find by company
  if (company) {
    queryObject.company = company;
  }
  // find by name
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }
  console.log(queryObject);

  // launch the find
  let result = Products.find(queryObject);
  // sort
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('CreatedAt');
  }

  // select
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }
  const products = await result;
  // mongoose V6 way:
  //const products = await Products.find(req.query);

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
