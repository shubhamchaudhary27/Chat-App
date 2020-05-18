'use strict';

var config 		= require('../config');
var Mongoose 	= require('mongoose');
var logger 		= require('../logger');


var dbURI = config.dbUri;
Mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });


Mongoose.connection.on('error', function(err) {
	if(err) throw err;
});
console.log('MongoDB connected');

Mongoose.Promise = global.Promise;

module.exports = { Mongoose, 
	models: {
		user: require('./schemas/user.js'),
		room: require('./schemas/room.js')
	}
};
