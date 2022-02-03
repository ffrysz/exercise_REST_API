const express = require('express');
// const db = require('../db');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Testimonial = require('../models/testimonial.model');

router.get('/testimonials', async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/random', async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const test = await Testimonial.findOne().skip(rand);
    if (!test) res.status(404).json({ message: 'Not found' });
    res.json(test);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get('/testimonials/:id', async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if (!test) res.status(404).json({ message: 'Not found' });
    else res.json(test);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post('/testimonials', async (req, res) => {
  try {
    const { id, author, text } = req.body;
    const newTestimonial = new Testimonial({ id: id, author: author, text: text });
    await newTestimonial.save();
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/testimonials/:id', async (req, res) => {
  try {
    const { id, author, text } = req.body;

    const test = await Testimonial.findById(req.params.id);
    if (test) {
      await Testimonial.updateOne({ _id: req.params.id }, { $set: { id: id, author: author, text: text } })
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    const test = await Testimonial.findById(req.params.id);
    if (test) {
      await test.remove();
      res, json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }

})

// router.route('/testimonials').get((req, res) => {
//   res.json(db.testimonials);
// });

// router.route('/testimonials/random').get((req, res) => {
//   const rand = Math.floor(Math.random() * db.testimonials.length);
//   res.json(db.testimonials[rand]);
// });

// router.route('/testimonials/:id').get((req, res) => {
//   const index = db.testimonials.find(value => value.id == req.params.id);
//   res.json(index);
// });

// router.route('/testimonials').post((req, res) => {
//   const { author, text } = req.body;
//   const data = {
//     id: uuidv4(),
//     author: author,
//     text: text,
//   }
//   db.testimonials.push(data);
//   res.json({ message: 'OK' })
// });

// router.route('/testimonials/:id').put((req, res) => {
//   const { author, text } = req.body;
//   const elementToEdit = db.testimonials.findIndex(item => item.id == req.params.id);
//   db.testimonials[elementToEdit] = {
//     id: req.params.id,
//     author: author,
//     text: text,
//   }
//   res.json({ message: 'OK' })
// });

// router.route('/testimonials/:id').delete((req, res) => {
//   const elementToDelete = db.testimonials.findIndex(item => item.id == req.params.id);
//   db.testimonials.splice(elementToDelete, 1);
//   res.json({ message: 'OK' })
// });

module.exports = router;