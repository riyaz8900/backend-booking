const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    maxlength: [100, 'Email cannot exceed 100 characters']
  },
  service: {
    type: String,
    required: [true, 'Service selection is required'],
    enum: ['Web Development', 'App Development', 'Marketing', 'Other'],
    default: 'Web Development'
  },
  budget: {
    type: String,
    required: [true, 'Budget selection is required'],
    enum: ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000+', 'Not sure'],
    default: 'Not sure'
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'contacted', 'archived'],
    default: 'new'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;