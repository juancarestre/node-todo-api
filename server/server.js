require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todos');
const { authenticate } = require('./middleware/authenticate');
const { userRoutes } = require('./routes/userRoutes');
const { ObjectID } = require('mongodb');

const app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id,
    });


    todo.save().then((doc) => {
        res.status(200).send(doc);
        // console.log(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id,
    }).then((todos) => {
        res.send({ todos });
    }), (e) => {
        res.status(400).send(e);
    };
});

app.get('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id,
    }).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx');
        }
        // console.log(JSON.stringify(todo, undefined, 2));
        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    const { id } = req.params;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id,
        });
        if (!todo) {
            res.status(404).send('Not foundx');
        }
        res.send({ todo });
    } catch (error) {
        res.status(400).send();
    }
});

app.patch('/todos/:id', authenticate, (req, res) => {
    const { id } = req.params;
    const body = _.pick(req.body, ['text', 'completed']);

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            res.status(404).send('Not foundx');
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.use('/user', userRoutes);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
