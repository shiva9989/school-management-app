import express from 'express';
import Teacher from '../models/Teacher.js';

const router = express.Router();

// Create a new teacher
router.post('/', async (req, res) => {
  const newTeacher = new Teacher({
    ...req.body,
    assignedClass: req.body.assignedClass || null
  });
  try {
    const savedTeacher = await newTeacher.save();
    res.status(201).json(savedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific teacher
router.get('/:id', getTeacher, (req, res) => {
  res.json(res.teacher);
});


// update a teacher
router.put('/:id', async (req, res) => {
  console.log('Received update request for teacher ID:', req.params.id);
  console.log('Update data:', req.body);

  try {
    // Find teacher by ID
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Update teacher fields dynamically
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] != null) {
        teacher[key] = req.body[key];
      }
    });

    // Save the updated teacher
    const updatedTeacher = await teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: err.message });
  }
});

// Update a teacher
router.patch('/:id', getTeacher, async (req, res) => {
  if (req.body.name != null) {
    res.teacher.name = req.body.name;
  }
  if (req.body.gender != null) {
    res.teacher.gender = req.body.gender;
  }
  if (req.body.dob != null) {
    res.teacher.dob = req.body.dob;
  }
  if (req.body.email != null) {
    res.teacher.email = req.body.email;
  }
  if (req.body.phone != null) {
    res.teacher.phone = req.body.phone;
  }
  if (req.body.salary != null) {
    res.teacher.salary = req.body.salary;
  }
  if (req.body.assignedClass != null) {
    res.teacher.assignedClass = req.body.assignedClass;
  } else {
    res.teacher.assignedClass = null;
  }
  try {
    const updatedTeacher = await res.teacher.save();
    res.json(updatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a teacher
// Delete a teacher
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: 'Cannot find teacher' });
    }
    res.json({ message: 'Deleted teacher' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTeacher(req, res, next) {
  let teacher;
  try {
    teacher = await Teacher.findById(req.params.id);
    if (teacher == null) {
      return res.status(404).json({ message: 'Cannot find teacher' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.teacher = teacher;
  next();
}

export default router;