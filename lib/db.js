//var mongodb = require('mongodb');
var mongo = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/simpleChat';
//var server = new mongodb.Server('127.0.0.1', 27017, {});
//var client = new mongodb.Db('simpleChat', server, {w :1})





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
   var cursor =db.collection('messages').find(query).sort({timestamp: 1});
   var result = [];
   cursor.each(function(err, doc) {
      if (doc != null) {
		 result.push(doc);
      } else {
         callback(result);
      }
   });
	

}



var insertDocument = function(db, data, callback) {
		var col = db.collection("messages");
		col.insertOne(data, function(err, result) {
			if (err)  throw err;
			callback(result);
		});
	

}



/**
	client.open(function (err){
		if (err) throw err;
		var col = client.collection('simpleChat_messages');
		col.insert(data, {safe: true},
		function(err, documents){
			if(err) throw err;
		});
		client.close();
	});
**/
	
