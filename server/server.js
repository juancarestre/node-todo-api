require('./config/config')

const _ = require('lodash');
const express = require('express')
const bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todos');
var {User} = require('./models/user');

var {authenticate} = require('./middleware/authenticate')

const {ObjectID} = require('mongodb');

var app = express();

const bcrypt = require('bcryptjs');

const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    

    todo.save().then((doc) => {
        res.status(200).send(doc);
        //console.log(doc);
        
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        //console.log(JSON.stringify({todos}, undefined, 2));
        res.send({todos})
    }), (e) => {
        res.status(400).send(e);
    }
});

// GET/todos/123123

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx')
        }
        //console.log(JSON.stringify(todo, undefined, 2));
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

})

app.delete('/todos/:id', authenticate, async (req, res) => {
    var id = req.params.id

    if (!ObjectID.isValid(id)){
        return res.status(404).send()
    }

    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        if (!todo) {
            res.status(404).send('Not foundx')
        }
        res.send({todo});
    } catch (error) {
        res.status(400).send(); 
    }

});

app.patch('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null
    }

    Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx')
        }

        res.send({todo})

    }).catch((e) => {
        res.status(400).send();
    })

})

// Users

app.post('/user', async (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    try {
        await user.save()
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user) 
    } catch (error) {
        res.status(400).send(error)
    }

});


app.post('/user/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password)
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);        
    } catch (error) {
        res.sendStatus(400).send();      
    }
});


app.get('/user/me', authenticate, (req, res) => {
    res.send(req.user);
})

app.delete('/user/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.status(200).send();
    } catch (error) {
        res.sendStatus(400).send();
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {app};