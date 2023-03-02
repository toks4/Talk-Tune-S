const { Schema, model } = require("mongoose");


const reviewsSchema = new Schema(
  {
    Score: {
      type: Number,
      required: true
    },
    Content: {
      type: String,
      required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const Reviews = model("Reviews", userSchema);

module.exports = Reviews;
