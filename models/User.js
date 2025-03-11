const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model('User', UserSchema);
