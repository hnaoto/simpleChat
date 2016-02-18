
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
		if(err) throw err;
		findMessages(db, query, function(data) {
			db.close();
			callback(data);
		});
	});
}




var findMessages = function (db, query, callback){
	
	//sort({'data.timestamp: 1'})
	var cursor =db.collection('messages').find(query);
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





module.exports = exports = db;





	
