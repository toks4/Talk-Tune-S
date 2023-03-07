const { Schema, model } = require("mongoose");


const reviewsSchema = new Schema(
  {
    Rating: {
      type: Number,
      required: true
    },
    Content: {
      type: String,
      required: true
    },
    Podcast: {
        type: Schema.Types.ObjectId,
        ref: 'Podcast',
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Reviews = model("Reviews", userSchema);

module.exports = Reviews;
