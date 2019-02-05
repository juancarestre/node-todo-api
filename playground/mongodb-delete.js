// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server')

    const db = client.db('TodoApp');

    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteMany

    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then(result => console.log(result));

    //deleteOne

    // db.collection('Todos').findOneAndDelete({completed: false}).then(result => console.log(result));

    // findOneAndDelete

    // db.collection('Users').deleteMany(
    //     {name: 'Juan'}
    //     ).then(deleted => console.log(JSON.stringify(deleted))
    // ).catch(error => console.log(error));

    db.collection('Users').findOneAndDelete({ name: 'Duban' }).then((deleted) => {
        console.log(JSON.stringify(deleted, undefined, 2));
    })

    client.close();
});