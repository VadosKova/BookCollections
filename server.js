const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book'); 

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://admin:admin@db.bdboune.mongodb.net/?retryWrites=true&w=majority&appName=DB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.post('/books', async (req, res) => {
  try {
    const { title, author, available } = req.body;
    if (!title || !author) {
      return res.status(400).json({ error: 'title и author обязательные поля' });
    }
    const book = await Book.create({ title, author, available });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});