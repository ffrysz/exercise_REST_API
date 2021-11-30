const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const rand = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[rand]);
});

router.route('/testimonials/:id').get((req, res) => {
  const index = db.testimonials.findIndex(value => value.id == req.params.id);
  res.json(db.testimonials[index]);
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const data = {
    id: uuidv4(),
    author: author,
    text: text,
  }
  db.testimonials.push(data);
  res.json({ message: 'OK' })
});

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  const elementToEdit = db.testimonials.findIndex(item => item.id == req.params.id);
  db.testimonials[elementToEdit] = {
    id: req.params.id,
    author: author,
    text: text,
  }
  res.json({ message: 'OK' })
});

router.route('/testimonials/:id').delete((req, res) => {
  const elementToDelete = db.testimonials.findIndex(item => item.id == req.params.id);
  db.testimonials.splice(elementToDelete, 1);
  res.json({ message: 'OK' })
});

module.exports = router;