const {SHA256} = require('crypto-js')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcryptjs');

var password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log('callback', hash)
    })
})


bcrypt.genSalt(10).then((salt) => {
    console.log('salt',salt);
    return bcrypt.hash(password, salt)
}).then((hash) => {
    console.log('promise', hash);
}).catch(err => console.log('error',err))

bcrypt.genSalt(10)
.then(salt => bcrypt.hash(password, salt))
.then(hash => console.log('cool promise', hash))
.catch(err => console.log('error',err))

bcrypt.genSalt(10).then(salt => bcrypt.hash(password, salt))
.then(hash => console.log('cool promise 666', hash))

var hashedPassword = '$2a$10$W4ouwS0v.6iaP2JUUywUkunbO8bzw6Zujb.JTLn7/0dRUjSSSDkL6'

bcrypt.compare(password, hashedPassword).then((result) => {
    console.log(result);
})


// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token)

// var decoded = jwt.verify(token, '123abc')
// console.log('decoded', decoded)

// var message = 'I am user number 3';
// var hash = SHA256(message).toString();
// console.log(`Message: ${message}`);

// console.log(`Hashed: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed, dont trust');
    
// }

