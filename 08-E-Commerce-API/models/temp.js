const agg = [
  {
    $match: {
      product: new ObjectId('6197de71e5c559dc5660cb92'),
    },
  },
  {
    $group: {
      _id: null,
      averageRating: {
        $avg: '$rating',
      },
      numOfReviews: {
        $sum: 1,
      },
    },
  },
];
