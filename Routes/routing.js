const express = require('express');

require('dotenv').config();

const jwt = require('jsonwebtoken');

const routing = express.Router();
const notesController = require('../Controller/myNotes');
const userController = require('../Controller/user');
const { verifyToken } = require('../Utilities/tokenVerifcation');

routing.post('/register', userController.userRegister);

routing.post('/login', userController.login);

routing.get('/notes', verifyToken, notesController.getNotes);

routing.post('/notes', verifyToken, notesController.newNotes);

routing.put('/notes/:id', verifyToken, notesController.updateNotes);

routing.delete('/notes/:id', verifyToken, notesController.deleteNotes);

routing.all('*', verifyToken, notesController.invalid);

module.exports = routing;
