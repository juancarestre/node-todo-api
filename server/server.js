var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var app = express()

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    

    todo.save().then((doc) => {
        res.status(200).send(doc);
        console.log(doc);
        
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        console.log(JSON.stringify({todos}, undefined, 2));
        res.send({todos})
    }), (e) => {
        res.status(400).send(e);
    }
});

app.listen(3000, () => {
    console.log('Started on port 3000');
})

module.exports = {app};

// var user = new User({
//     email: ' jcrestrepobedoya@gmail.com '
// });

// user.save().then((result) => {
//     console.log('Saved todo',result);
// }).catch((err) => {
//     console.log('Unable to save todo', err)
// });

// var newTodo = new Todo({
//     text: 'Feed the cat',
//     completed: false,
//     completedAt: 123
// });

// var newTodo = new Todo({
//     text: '         asd          '
// });

// newTodo.save().then((result) => {
//     console.log('Saved todo',result);
// }).catch((err) => {
//     console.log('Unable to save todo', err)
// });
