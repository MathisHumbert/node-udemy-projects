const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'Please provide review title'],
      maxlength: 100,
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

// only one review per user for a particular product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// function linked to the schema that we can only use in the Product
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  // agregate
  const result = await this.aggregate([
    // first stage
    {
      $match: { product: productId },
    },
    // second stage
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  // send the result to the update Product model
  try {
    await this.model('Product').findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.product);
  console.log('post save hook called');
});

ReviewSchema.post('remove', async function () {
  await this.constructor.calculateAverageRating(this.product);
  console.log('post remove hook called');
});

module.exports = mongoose.model('Review', ReviewSchema);
