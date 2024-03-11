const express = require('express');
const cors = require('cors'); // import cors
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/place');
const Booking = require('./models/booking');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r45r3wq45wdfgw34twdfg';

app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookieParser());
// Middleware for CORS and JSON parsing
app.use(
  cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
  }),
); // enable CORS

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

//Register
app.post('/register', async (req, res) => {
  // Access form data from request body
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });

    // Process data here (e.g., validate, store in database)
    console.log('Received registration data:', { name, email, password });

    // Send response with received data as JSON
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;

          res.cookie('token', token).json(userDoc);
        },
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });

app.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
  const uploadedFiles = [];
  try {
    for (const file of req.files) {
      const ext = path.extname(file.originalname); // Extract extension from original name

      // Generate a unique filename incorporating original filename and extension
      const newName = path.basename(file.originalname, ext) + '-' + Date.now() + ext;
      const newPath = path.join(path.dirname(file.path), newName);

      // Move the uploaded file and replace with the new path
      await fs.promises.rename(file.path, newPath);

      uploadedFiles.push(newName.replace('uploads/', ''));
    }
    res.json(uploadedFiles);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Upload failed' }); // Send an error response to the client
  }
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos,
    description,
    skills,
    home,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    guestsName,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      description,
      skills,
      home,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      guestsName,
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    skills,
    home,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
    guestsName,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        skills,
        home,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
        guestsName,
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.get('/users', async (req, res) => {
  res.json(await User.find());
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await User.findById(id));
});

app.post('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, petName, phone, price } = req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    petName,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

// Start the server
app.listen(5173);
