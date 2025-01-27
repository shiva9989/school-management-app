import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  salary: { type: Number, required: true },
  assignedClass: { type: String, required: false, default: null }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;