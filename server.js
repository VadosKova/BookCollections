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

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Incorrect ID' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { title, author, available } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, { title, author, available }, { new: true, runValidators: true });

    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({ error: 'Incorrect ID' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Incorrect ID' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});