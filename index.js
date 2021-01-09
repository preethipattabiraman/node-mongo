const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const morgan = require('morgan');
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log("Connected to the server");
    const db = client.db(dbname);
    const collection = db.collection('dishes');
    collection.insertOne({"name" : "Bread", "description" : "Salted"}, (err, result) => {
        assert.equal(err, null);
        console.log("After Insert : " + result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);

                client.close();
            });
        });
    });
});