const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

if (mongoose.models.University) {
  // If the University model exists, delete it
  delete mongoose.connection.models['University'];
}

const University = mongoose.model('University', universitySchema);

module.exports = University;
