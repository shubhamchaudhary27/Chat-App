'use strict';

const userModel = require('../database').models.user;

let create = function (data, callback){
	let newUser = new userModel(data);
	newUser.save(callback);
};

let findOne = function (data, callback){
	userModel.findOne(data, callback);
}

let findById = function (id, callback){
	userModel.findById(id, callback);
}


/**
 * A middleware allows user to get access to pages ONLY if the user is already logged in.
 *
 */
let isAuthenticated = function (req, res, next) {
	if(req.isAuthenticated()){
		next();
	}else{
		res.redirect('/');
	}
}

module.exports = { 
	create, 
	findOne, 
	findById, 
	isAuthenticated 
};
