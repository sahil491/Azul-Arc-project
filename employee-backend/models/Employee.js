const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age:  Number,
  dob: Date,
  address: String,
   photo: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
