const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    username: String,
    city: String,
    date: Date
	
});

module.exports = {
    Transaction: mongoose.model('transaction', TransactionSchema)
} 