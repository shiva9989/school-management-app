import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  
  name: { type: String, required: true },
  year: { type: Number, required: true },
  teacherId: { type: String, required: true },
  maxStudents: { type: Number, required: true },
  fees: { type: Number, required: true },
  students: [{ type: String }]
});

const Class = mongoose.model('Class', classSchema);
export default Class;