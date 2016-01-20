//var mongodb = require('mongodb');
var mongo = require('mongodb').MongoClient;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/simplechat';
//var server = new mongodb.Server('127.0.0.1', 27017, {});
//var client = new mongodb.Db('simpleChat', server, {w :1})





exports.add = function (data){
	MongoClient.connect(url, function(err, db) {
		//assert.equal(null, err);
		if(err) throw err;
		//insertDocument(db, data, function() {
		//	db.close();
		//});
		
});

}


var insertDocument = function(db, data, callback) {
		var col = db.collection("chatmessages");
		col.insertOne({
		 
		}, function(err, result) {
			assert.equal(err, null);
			console.log("Inserted a document into the chat messages collection.");
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
	
