var express = require('express')
var bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

const {ObjectID} = require('mongodb');

var app = express();

const port = process.env.PORT || 3000;

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

// GET/todos/123123

app.get('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx')
        }
        console.log(JSON.stringify(todo, undefined, 2));
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx')
        }

        console.log(JSON.stringify(todo, undefined, 2));
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
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
