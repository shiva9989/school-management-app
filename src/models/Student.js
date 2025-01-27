import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  classId: { type: String, required: true },
  feesPaid: { type: Number, required: true }
});


const Student = mongoose.model('Student', studentSchema);
export default Student;