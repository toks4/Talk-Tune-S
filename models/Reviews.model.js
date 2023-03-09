const { Schema, model } = require("mongoose");


const reviewsSchema = new Schema(
  {
    rating: {
      type: Number,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    podcast: {
        type: Schema.Types.ObjectId,
        ref: 'Podcast',
      },
    creator: {
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Reviews = model("Reviews", reviewsSchema);

module.exports = Reviews;
