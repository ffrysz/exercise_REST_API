const express = require('express');
// const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Concert = require('../models/concert.model');

router.get('/concerts', async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/concerts/random', async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const conc = await Concert.findOne().skip(rand);
    if (!conc) res.status(404).json({ message: 'Not found' });
    res.json(conc);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/concerts/:id', async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/concerts', async (req, res) => {
  try {
    const { id, performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/concerts/:id', async (req, res) => {
  try {
    const { id, performer, genre, price, day, image } = req.body;

    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { id: id, performer: performer, genre: genre, price: price, day: day, image: image } })
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/concerts/:id', async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await conc.remove();
      res, json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

})

// router.route('/concerts').get((req, res) => {
//   res.json(db.concerts);
// });

// router.route('/concerts/random').get((req, res) => {
//   const rand = Math.floor(Math.random() * db.concerts.length);
//   res.json(db.concerts[rand]);
// });

// router.route('/concerts/:id').get((req, res) => {
//   const index = db.concerts.find(value => value.id == req.params.id);
//   res.json(index);
// });

// router.route('/concerts').post((req, res) => {
//   const { author, text } = req.body;
//   const data = {
//     id: uuidv4(),
//     author: author,
//     text: text,
//   }
//   db.concerts.push(data);
//   res.json({ message: 'OK' })
// });

// router.route('/concerts/:id').put((req, res) => {
//   const { author, text } = req.body;
//   const elementToEdit = db.concerts.findIndex(item => item.id == req.params.id);
//   db.concerts[elementToEdit] = {
//     id: req.params.id,
//     author: author,
//     text: text,
//   }
//   res.json({ message: 'OK' })
// });

// router.route('/concerts/:id').delete((req, res) => {
//   const elementToDelete = db.concerts.findIndex(item => item.id == req.params.id);
//   db.concerts.splice(elementToDelete, 1);
//   res.json({ message: 'OK' })
// });

module.exports = router;