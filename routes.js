const router = require('express').Router();
const { application } = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const fs = require('fs');
const path = require('path');

var contacts = [
  {
    id: '1',
    name: 'meysari',
  },
];

router.get('/contact', (req, res) => {
  res.send({
    success: true,
    message: 'data fatched successfully',
    data: contacts,
  });
});

router.get('/', (req, res) => {
  res.send({
    status: 'succesfully',
    message: 'welcome to Express Js Tutorial',
  });
});

router.post('/contact', (req, res) => {
  var name = req.body.name;
  if (name) {
    contacts.push({
      id: (contacts.length + 1).toString(),
      name: name,
    });
    res.send({
      success: true,
      message: 'data added successfully',
    });
  } else {
    res.send({
      success: false,
      message: 'validation erorr',
      erorrs: [
        {
          field: 'name',
          message: 'cannot be null',
        },
      ],
    });
  }
});

router.delete('/contact/:id', (req, res) => {
  var id = req.params.id;
  var newContacts = contacts.filter((el) => el.id != id);
  contacts = newContacts;

  res.send({
    success: true,
    message: 'data deleted successfully',
  });
});

router.put('/contact/:id', (req, res) => {
  var id = req.params.id;
  var name = req.body.name;
  if (name) {
    var index = contacts.findIndex((el) => el.id == id);
    contacts[index] = {
      ...contacts[index],
      name: name,
    };
    res.send({
      success: true,
      message: 'data update successfully',
    });
  } else {
    res.send({
      success: false,
      message: 'validation erorr',
      erorrs: [
        {
          field: 'name',
          message: 'cannot be null',
        },
      ],
    });
  }
});

router.get('/product/:id', (req, res) => {
  res.json({
    id: req.params.id,
  });
});

router.post('/product/', upload.single('image'), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, 'uploads', image.originalname);
    fs.renameSync(image.path, target);
    res.json({
      name,
      price,
      stock,
      status,
      image,
    });
  }
});

router.get('/:category/:tag', (req, res) => {
  const { category, tag } = req.params;
  res.json({ category, tag });
});

application.post('/cover', upload.single('image'), function (req, res, next) {
  //req.file
  //req.body
});

module.exports = router;
