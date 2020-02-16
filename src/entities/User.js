const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	_id: String,
	username: String,
	password: String
	
});

module.exports = {
	User: mongoose.model('user', UserSchema)
} 