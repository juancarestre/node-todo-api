// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');

    // db.collection('Todos').findOneAndUpdate(
    //     {
    //         text: 'Eat lunch'
    //     }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((res) => {
    //     console.log(JSON.stringify(res, undefined, 2))
    // })

    db.collection('Users').findOneAndUpdate({
        name: 'Jen'
    },{
        $set: {
            name: 'Juan'
        },
        $inc: {
            age: 1
        }
    }).then(res => console.log(res))

    client.close();
});