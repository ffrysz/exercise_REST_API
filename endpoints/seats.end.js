const express = require('express');
// const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Seat = require('../models/seat.model');


router.get('/seats', async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/random', async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const seat = await Seat.findOne().skip(rand);
    if (!seat) res.status(404).json({ message: 'Not found' });
    res.json(seat);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/seats', async (req, res) => {
  try {
    const { id, day, seat, client, email } = req.body;
    const newSeat = new Seat({ id: id, day: day, seat: seat, client: client, email: email });
    await newSeat.save();
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/seats/:id', async (req, res) => {
  try {
    const { id, day, seat, client, email } = req.body;

    const st = await Seat.findById(req.params.id);
    if (st) {
      await Seat.updateOne({ _id: req.params.id }, { $set: { id: id, day: day, seat: seat, client: client, email: email } })
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/seats/:id', async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await seat.remove();
      res, json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

})



// router.route('/seats').get((req, res) => {
//   res.json(db.seats);
// });

// router.route('/seats/random').get((req, res) => {
//   const rand = Math.floor(Math.random() * db.seats.length);
//   res.json(db.seats[rand]);
// });

// router.route('/seats/:id').get((req, res) => {
//   const index = db.seats.find(value => value.id == req.params.id);
//   res.json(index);
// });

// router.route('/seats').post((req, res) => {
//   const { client, email, day, seat } = req.body;
//   const data = {
//     id: uuidv4(),
//     client: client,
//     email: email,
//     day: day,
//     seat: seat,
//   }
//   const taken = db.seats.some(el => {
//     return el.seat == data.seat && el.day == data.day;
//   });
//   if (!taken) {
//     db.seats.push(data);
//     req.io.emit('seatsUpdated', db.seats);
//     // res.json({ message: 'OK' });
//   } else {
//     res.status(409).json({ message: 'The slot is already taken...' })
//   }

// });

// router.route('/seats/:id').put((req, res) => {
//   const { author, text } = req.body;
//   const elementToEdit = db.seats.findIndex(item => item.id == req.params.id);
//   db.seats[elementToEdit] = {
//     id: req.params.id,
//     author: author,
//     text: text,
//   }
//   res.json({ message: 'OK' })
// });

// router.route('/seats/:id').delete((req, res) => {
//   const elementToDelete = db.seats.findIndex(item => item.id == req.params.id);
//   db.seats.splice(elementToDelete, 1);
//   res.json({ message: 'OK' })
// });

module.exports = router;