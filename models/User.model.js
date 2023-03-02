const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
      firstname: {
        type: String,
        required: [true, 'First Name is required.'],
      },
      lastname: {
        type: String,
        required: [true, 'Last Name is required.'],
      },
      birthday: {
        type: Number,
      },
      city: {
        type: String,
      },
      country: {
       type: String,
      },
      email: {
        type: String,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
        required: ['true', 'Email is required.'],
        lowercase: 'true',
        trim: 'true',
        unique: 'true',
      },
      passwordHash: {
        type: String,
        required: ['true', 'Password is required.'],
      },
    },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  },
);

const User = model("User", userSchema);

module.exports = User;
