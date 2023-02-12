const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const log = require('./middlewares/logger');

app.use(log);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static);
app.use(router);
app.listen(3000, () => console.log('server:http://localhost:3000'));
