const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

var id = "5c5a405e74debc049818cc3d";

if (!ObjectID.isValid(id)){
    console.log('Id not valid')
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log(todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
        if (!user) {
            return console.log('User not found')
        }
        console.log(user);
    }).catch((e) => console.log(e));