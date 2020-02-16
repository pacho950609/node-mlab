const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	_id: String,
	usuario: String,
	password: String
	
});

module.exports = {
    User: mongoose.model('user', UserSchema)
} 