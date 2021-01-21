const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document,(err, result) => {
        assert.equal(err, null);
        console.log("inserted successfully :"  + result.result.n + " documents into the collection.");
        callback ? callback(result) : '';
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.findOne({}, (err, result) =>{
        assert.equal(err, null);
        callback(result);
    });
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err, null);
        console.log("Successfully deleted " + document);
        callback(result);
    });

};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set : update}, null, (err, result) =>{
        assert.equal(err, null);
        console.log("Updated document " + document + " with " + update);
        callback(result);
    });
};