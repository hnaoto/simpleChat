//var mongo = require('mongodb').MongoClient;
//var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://localhost:27017/simpleChat';



//'mongodb://chat:nodesimplechat@ds029615.mongolab.com:29615/nodesimplechat'

var MongoClient = require('mongodb').MongoClient;
var db = function(url){
	this.MongoClient = MongoClient;
	this.url = url;
	

}



db.prototype.insert = function (data){
	this.MongoClient.connect(this.url, function(err, db) {
		if(err) throw err;
		insertDocument(db, data, function() {
			db.close();
		});
	});
}




db.prototype.find = function(query, callback) {
	this.MongoClient.connect(this.url, function(err, db) {
	console.log(this.url);
		if(err) throw err;
		findMessages(db, query, function(data) {
			db.close();
			callback(data);
		});
	});
}




var findMessages = function (db, query, callback){
	
	var cursor =db.collection('messages').find(query).sort({timestamp: 1});
	if (query['user'] == 1) {
		cursor =db.collection('messages').find({}, query);
	}
	
	var result = [];
	cursor.each(function(err, doc) {
		if (doc != null) {
			result.push({'data': doc['data'], 'private':  doc['private'], read: doc['read']} );
		} else {
			
			callback(result);
		}
	});
	
}




module.exports = exports = db;





/**
exports.insert = function (data){
	MongoClient.connect(url, function(err, db) {
		if(err) throw err;
		insertDocument(db, data, function() {
			db.close();
		});
	});
}



exports.find = function(query, callback) {
	MongoClient.connect(url, function(err, db) {
		findMessages(db, query, function(data) {
			db.close();
			callback(data);
		});
	});
}



var findMessages = function (db, query, callback){

	/**
	db.collection('messages').distinct('value', query, function(err, items) {
		items  = items.sort({'timestamp': -1});
		callback(items);
    });
	**/


	/**
	
	var cursor =db.collection('messages').find(query).sort({timestamp: 1});
	if (query['user'] == 1) {
		cursor =db.collection('messages').find({}, query);
	}
	
	var result = [];
	cursor.each(function(err, doc) {
		if (doc != null) {
			result.push({'data': doc['data'], 'private':  doc['private'], read: doc['read']} );
		} else {
			
			callback(result);
		}
	});
	
}



var insertDocument = function(db, data, callback) {
	var col = db.collection('messages');
	col.insertOne(data, function(err, result) {
		if (err)  throw err;
		callback(result);
	});

}
**/




	
