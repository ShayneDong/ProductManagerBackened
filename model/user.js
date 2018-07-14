const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : [true,'用户名不能为空']
    },
    password : {
        type : String,
        required:[true,'密码不能为空']
    },
    age : {
        type : Number,
        min : [0,'年龄最小不小于0'],
        max : [150,'年龄最大不超过150'],
        default : 10
    },
    role : {
        type : Number,
        default:0
    },
    created: {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('users', schema);
