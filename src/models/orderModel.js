const mongoose = require('mongoose');

const SALES= new mongoose.Schema({
   
	userId: mongoose.Schema.Types.ObjectId,
	productId:mongoose.Schema.Types.ObjectId,
	amount: Number,
	isFreeAppUser: Boolean, 
		
	date: String

}, { timestamps: true })

module.exports = mongoose.model('ORDER', SALES);