const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {name:{
      FirstName: String,
      LastName: String,
      yearOfBirth: Number,
      City: String,
      Country: String,
      required: 'true',
      unique: 'true'

  },
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      required: ['true', 'Email is required.'],
      lowercase: 'true',
      trim: 'true',
      unique: 'true'
    },
    passwordHash: {
      type: String,
      required: ['true', 'Password is required.']
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
