const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

mongoose.connect('mongodb://localhost/videostrimer', { useNewUrlParser: true })

const db = mongoose.connection

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        index: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.createUser = function(newUser, cb){ 

    bcrypt.genSalt(10, function(err, salt){
        if (err) throw err
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash
        })
        newUser.save(cb)
    })
}