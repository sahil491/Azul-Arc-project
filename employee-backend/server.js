const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = 5000
const employeeRoutes = require('./routes/employee');

dotenv.config(); // 🔥 Load env variables

const app = express();
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => console.log(`Server started on port${PORT}` ));
