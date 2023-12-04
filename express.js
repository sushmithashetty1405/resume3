const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect('mongodb://localhost/resumeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  name: String,
  title: String,
  skills: [String],
  workExperience: [
    {
      jobTitle: String,
      companyName: String,
      dateRange: String,
      description: String,
    },
  ],
  projects: [
    {
      projectTitle: String,
      projectDescription: String,
    },
  ],
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Middleware for JSON parsing
app.use(express.json());

// CRUD operations
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Add routes for updating and deleting user data if needed

// Start the server
app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});