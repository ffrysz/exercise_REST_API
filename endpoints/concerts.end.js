const express = require('express');
const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  const rand = Math.floor(Math.random() * db.concerts.length);
  res.json(db.concerts[rand]);
});

router.route('/concerts/:id').get((req, res) => {
  const index = db.concerts.findIndex(value => value.id == req.params.id);
  res.json(db.concerts[index]);
});

router.route('/concerts').post((req, res) => {
  const { author, text } = req.body;
  const data = {
    id: uuidv4(),
    author: author,
    text: text,
  }
  db.concerts.push(data);
  res.json({ message: 'OK' })
});

router.route('/concerts/:id').put((req, res) => {
  const { author, text } = req.body;
  const elementToEdit = db.concerts.findIndex(item => item.id == req.params.id);
  db.concerts[elementToEdit] = {
    id: req.params.id,
    author: author,
    text: text,
  }
  res.json({ message: 'OK' })
});

router.route('/concerts/:id').delete((req, res) => {
  const elementToDelete = db.concerts.findIndex(item => item.id == req.params.id);
  db.concerts.splice(elementToDelete, 1);
  res.json({ message: 'OK' })
});

module.exports = router;