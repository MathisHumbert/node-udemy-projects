// get the model
const { query } = require('express');
const { Query } = require('mongoose');
const Products = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  // const search = 'a';

  //const products = await Products.find(req.query);
  // const products = await Products.find({
  //   name: { $regex: search, $options: 'i' },
  // });

  //const products = await Products.find({}).sort('-name price');

  //const products = await Products.find({}).select('name price');

  // const products = await Products.find({})
  //   .sort('name')
  //   .select('name price')
  //   .limit(10)
  //   .skip(10);

  const products = await Products.find({ price: { $gt: 30 } })
    .sort('price')
    .select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // refractor for mongoose v5
  // we find name on the query = ?url
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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
  // numeric
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regex = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regex,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  console.log(queryObject);

  // launch the find
  let result = Products.find(queryObject);

  // sort by specific key
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('CreatedAt');
  }

  // select specific key
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    result = result.select(fieldsList);
  }

  // limit / skip
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  // await the result
  const products = await result;

  // mongoose V6 way:
  //const products = await Products.find(req.query);

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
