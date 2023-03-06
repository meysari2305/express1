const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log = require('./middlewares/logger');
const cors = require('cors');

app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/public', express.static);
app.use(router);
app.listen(6000, () => console.log('server up and runing'));
