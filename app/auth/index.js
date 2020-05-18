'use strict';

let config 		= require('../config');
let passport 	= require('passport');
let logger 		= require('../logger');

let LocalStrategy 		= require('passport-local').Strategy;

let User = require('../models/user');

let init = function(){

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// Plug-in Local Strategy
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	    User.findOne({ username: new RegExp(username, 'i'), socialId: null }, function(err, user) {
	      if (err) { return done(err); }

	      if (!user) {
	        return done(null, false, { message: 'Incorrect username or password.' });
	      }

	      user.validatePassword(password, function(err, isMatch) {
	        	if (err) { return done(err); }
	        	if (!isMatch){
	        		return done(null, false, { message: 'Incorrect username or password.' });
	        	}
	        	return done(null, user);
	      });

	    });
	  }
	));


	return passport;
}
	
module.exports = init();