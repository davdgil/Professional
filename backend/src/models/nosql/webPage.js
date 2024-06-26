const mongoose = require('mongoose');

const WebPageSchema = new mongoose.Schema({
  commerceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Commerce'
  },
  commerceName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    comment: String,
    rating: Number
  }],
  photos: [{
    url: String,
    description: String
  }]
}, {
  timestamps: true
});

const WebPage = mongoose.model('WebPage', WebPageSchema);

module.exports = WebPage;
