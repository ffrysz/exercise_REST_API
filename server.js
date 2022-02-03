//Plik zawiera modyfikacje wprowadzone w module MongoDB - dodane linie są odpowiednio zakomentowane

const express = require('express');
const socket = require('socket.io');
// const { v4: uuidv4 } = require('uuid');
const app = express();
const mongoose = require('mongoose');  // MONGODB
// const db = require('./db.js');

const testimonialsRoutes = require('./endpoints/testimonials.end');
const concertsRoutes = require('./endpoints/concerts.end');
const seatsRoutes = require('./endpoints/seats.end');
const cors = require('cors');
const path = require('path');


app.use(express.urlencoded({ extended: false }));
app.use(express.json()); //do obsługi przychodzących zapytań w formacie JSON
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// app.get('/testimonials', (req, res) => {
//   res.json(db.testimonials);
// });

// app.get('/testimonials/random', (req, res) => {
//   const rand = Math.floor(Math.random() * db.testimonials.length);
//   res.json(db.testimonials[rand]);
// });

// app.get('/testimonials/:id', (req, res) => {
//   const index = db.testimonials.findIndex(value => value.id == req.params.id);
//   res.json(db.testimonials[index]);
// });

// app.post('/testimonials', (req, res) => {
//   const { author, text } = req.body;
//   const data = {
//     id: uuidv4(),
//     author: author,
//     text: text,
//   }
//   db.testimonials.push(data);
//   res.json({ message: 'OK' })
// });

// app.put('/testimonials/:id', (req, res) => {
//   const { author, text } = req.body;
//   const elementToEdit = db.testimonials.findIndex(item => item.id == req.params.id);
//   db.testimonials[elementToEdit] = {
//     id: req.params.id,
//     author: author,
//     text: text,
//   }
//   res.json({ message: 'OK' })
// });

// app.delete('/testimonials/:id', (req, res) => {
//   const elementToDelete = db.testimonials.findIndex(item => item.id == req.params.id);
//   db.testimonials.splice(elementToDelete, 1);
//   res.json({ message: 'OK' })
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
})

mongoose.connect('mongodb://localhost:27017/newWaveDB', { useNewUrlParser: true, useUnifiedTopology: true }); // MONGODB
const db = mongoose.connection; // MONGODB 

db.once('open', () => { // MONGODB
  console.log('Connected to the database'); // MONGODB
}); // MONGODB
db.on('error', err => console.log('Error ' + err)); // MONGODB


const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
  cors: true,
});

io.on('connection', (socket) => {
  console.log(`New socket ${socket.id}`);
});