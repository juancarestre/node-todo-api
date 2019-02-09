const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({})

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove
Todo.findOneAndRemove({_id: "5c5efe0b39d67dedaf31c288"}).then((todo) => {
    console.log(todo);
    
})