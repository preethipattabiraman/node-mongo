const mongoClient = require('mongodb').MongoClient;

const dboper = require('./operations');
const url = "mongodb://localhost:27017/";
const dbname = "conFusion";

mongoClient.connect(url, (err, client) => {
    const db = client.db(dbname);
    dboper.insertDocument(db, {name : "Dosa", description : "circle"}, 'dishes', (result) => {
        console.log(result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log(docs);

            dboper.updateDocument(db, {name : "Dosa"}, {description : "Changed to oval"}, 'dishes', (result) => {
                console.log("Updated document " + result.result);

                dboper.findDocuments(db, 'dishes', (result) => {
                    console.log("Updated documents " + result);

                    db.dropCollection('dishes', (result) => {
                        console.log("Dropped Collection");

                        client.close();
                    });
                });
            });
        })
    });
});