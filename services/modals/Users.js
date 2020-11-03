const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    fullName:{
        type:String
    },
    password:{
        type:String
    }, 
    telephone:{
        type:Number,
        unique:true
    }
});

module.exports = mongoose.model('Users', Users);
