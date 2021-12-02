const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  const rand = Math.floor(Math.random() * db.seats.length);
  res.json(db.seats[rand]);
});

router.route('/seats/:id').get((req, res) => {
  const index = db.seats.find(value => value.id == req.params.id);
  res.json(index);
});

router.route('/seats').post((req, res) => {
  const { client, email, day, seat } = req.body;
  const data = {
    id: uuidv4(),
    client: client,
    email: email,
    day: day,
    seat: seat,
  }
  const taken = db.seats.some(el => {
    return el.seat == data.seat && el.day == data.day;
  });
  if (!taken) {
    db.seats.push(data);
    res.json({ message: 'OK' })
  } else {
    res.status(409).json({ message: 'The slot is already taken...' })
  }

});

router.route('/seats/:id').put((req, res) => {
  const { author, text } = req.body;
  const elementToEdit = db.seats.findIndex(item => item.id == req.params.id);
  db.seats[elementToEdit] = {
    id: req.params.id,
    author: author,
    text: text,
  }
  res.json({ message: 'OK' })
});

router.route('/seats/:id').delete((req, res) => {
  const elementToDelete = db.seats.findIndex(item => item.id == req.params.id);
  db.seats.splice(elementToDelete, 1);
  res.json({ message: 'OK' })
});

module.exports = router;