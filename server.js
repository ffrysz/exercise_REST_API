const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
  { id: 3, author: 'Jenson Button', text: 'They really know how to make you happy.' },
  { id: 4, author: 'John Oliver', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const rand = Math.floor(Math.random() * db.length);
  res.json(db[rand]);
});

app.get('/testimonials/:id', (req, res) => {
  const index = db.findIndex(value => value.id == req.params.id);
  res.json(db[index]);
});

app.post('/testimonials', (req, res) => {
  // res.json(req.body);
  res.json({ message: 'OK' })
});

app.put('/testimonials/:id', (req, res) => {
  res.json({ message: 'OK' })
});

app.delete('/testimonials/:id', (req, res) => {
  res.json({ message: 'OK' })
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});