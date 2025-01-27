import express from 'express';
import Class from '../models/Class.js';

const router = express.Router();

// Create a new class
router.post('/', async (req, res) => {
  console.log('Received class creation request');
  console.log('Request body:', req.body);
  
  // Log each field in detail
  Object.keys(req.body).forEach(key => {
    console.log(`${key}: ${req.body[key]} (type: ${typeof req.body[key]})`);
  });

  const newClass = new Class(req.body);

  try {
    const savedClass = await newClass.save();
    console.log('Class saved successfully:', savedClass);
    res.status(201).json(savedClass);
  } catch (err) {
    console.error('Error saving class:', err);
    
    // Detailed error logging
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => ({
        field: e.path,
        message: e.message,
        value: e.value,
        type: typeof e.value
      }));
      console.error('Validation Errors:', errors);
      return res.status(400).json({ 
        message: 'Validation Failed', 
        errors: errors 
      });
    }

    res.status(500).json({ 
      message: 'Server error', 
      error: err.message 
    });
  }
});

// Get all classes
router.get('/', async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific class
router.get('/:id', getClass, (req, res) => {
  res.json(res.class);
});

// Update a class
router.put('/:id', getClass, async (req, res) => {
  if (req.body.name != null) {
    res.class.name = req.body.name;
  }
  if (req.body.year != null) {
    res.class.year = req.body.year;
  }
  if (req.body.teacherId != null) {
    res.class.teacherId = req.body.teacherId;
  }
  if (req.body.maxStudents != null) {
    res.class.maxStudents = req.body.maxStudents;
  }
  if (req.body.fees != null) {
    res.class.fees = req.body.fees;
  }
  if (req.body.students != null) {
    res.class.students = req.body.students;
  }
  try {
    const updatedClass = await res.class.save();
    res.json(updatedClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a class
router.delete('/:id', getClass, async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    if (!deletedClass) {
      return res.status(404).json({ message: 'Cannot find teacher' });
    }
    res.json({ message: 'Deleted class' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getClass(req, res, next) {
  let class_;
  try {
    class_ = await Class.findById(req.params.id);
    if (class_ == null) {
      return res.status(404).json({ message: 'Cannot find class' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.class = class_;
  next();
}

export default router;