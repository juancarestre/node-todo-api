// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c58e953825c1fab6790691b')
    // }).toArray().then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2))
    // },(err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`)
    // },(err) => {
    //     console.log('Unable to fetch todos', err)
    // });

    db.collection('Users').find(
        {name: 'Juan'}
        ).toArray().then((Juans) => {
        console.log(JSON.stringify(Juans, undefined, 2));
    }).catch(err => {
        console.log('Unable to find Juans', err);
    });

    client.close();
});