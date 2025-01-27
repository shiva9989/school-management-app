import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific student
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Update a student
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.gender != null) {
    res.student.gender = req.body.gender;
  }
  if (req.body.dob != null) {
    res.student.dob = req.body.dob;
  }
  if (req.body.email != null) {
    res.student.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.student.phone = req.body.phone;
  }
  if (req.body.classId != null) {
    res.student.classId = req.body.classId;
  }
  if (req.body.feesPaid != null) {
    res.student.feesPaid = req.body.feesPaid;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// Replace the existing update route with this:
router.put('/:id', async (req, res) => {
  console.log('Received update request for student ID:', req.params.id);
  console.log('Update data:', req.body);
  
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    
    // Update student fields
    Object.keys(req.body).forEach(key => {
      if (req.body[key] != null) {
        student[key] = req.body[key];
      }
    });
    
    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: err.message });
  }
});
// Delete a student
router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Cannot find Student' });
    }
    res.json({ message: 'Deleted Student' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Cannot find student' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.student = student;
  next();
}

export default router;