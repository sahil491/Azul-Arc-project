const express = require('express');
const router = express.Router();
const multer = require('multer');
const calculateAge = require('../utils/calculateAge');
const Employee = require('../models/Employee');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 16 * 1024 * 1024 }
});
// Create
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const { name, email, dob, address } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    if (dob && new Date(dob) > new Date()) {
      return res.status(400).json({ message: 'Date of birth cannot be in the future' });
    }

    const age = dob ? calculateAge(dob) : undefined;

    const employee = new Employee({
      name,
      email,
      dob,
      address,
      age
    });

    if (req.file) {
      employee.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    }

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.error('Create Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/photo/:id', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee || !employee.photo || !employee.photo.data) {
      return res.status(404).send('Image not found');
    }
    res.set('Content-Type', employee.photo.contentType);
    res.send(employee.photo.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update
router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const updates = req.body;

    if (updates.dob && new Date(updates.dob) > new Date()) {
      return res.status(400).json({ message: 'Date of birth cannot be in the future' });
    }

    if (updates.dob) {
      updates.age = calculateAge(updates.dob);
    }

    if (req.file) {
      updates.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
    } else if (updates.photo === 'null') {
      updates.photo = { data: null, contentType: null };
    }

    const employee = await Employee.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;