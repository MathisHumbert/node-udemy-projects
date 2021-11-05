require('dotenv').config();

// connect to the dataDB
const connectDB = require('./db/connect');
// model
const Product = require('./models/product');
// json products
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);

    console.log('Success');
    // exit the process with success
    process.exit(0);
  } catch (error) {
    console.log(error);
    // exit the process with error
    process.exit(1);
  }
};

start();
