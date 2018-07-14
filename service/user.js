let user = require('../model/user');
let crypto = require('lxj-crypto');
let config = require('../config');

//获取用户信息
async function getUserInfo(username) {
    let res = await user.findOne({username: username}).select('-__v -password');
    if(!res){
        throw Error(`用户名为${username}用户不存在`)
    };
    return res;
}
//用户是否存在
async function isUserExist(username) {
    let res = await user.findOne({username: username}).select('-__v -password');
    if (!res) {
        throw Error(`用户名为${username}用户不存在`)
    };
}
//删除用户
async function deleteUser(username) {


    await isUserExist(username);
    let res =await user.deleteOne({username:username});
    if(res.n<1){
        throw Error('删除失败');
    };
}
//注册用户
async function registerUser(User) {
    let res = await user.findOne({username: User.username}).select('-__v -password');
    if (res) {
        throw Error(`用户名为${User.username}用户已存在`)
    };
    User.password =crypto.sha1Hmac(User.password, config.PasswordKey);
    User.role = 0;
    User.created = Date.now();

    res =await user.create(User);
    res.password = '';

    return res;
}
//登录用户
async function loginUser(User) {
    User.password = crypto.sha1Hmac(User.password, config.PasswordKey);
    let res = await user.findOne({username: User.username, password: User.password});
    if(!res){
        throw Error('用户名或者密码错误');
    }
    let tokenData = {
        username:User.username,
        expire:Date.now()+config.TokenExpire
    }
    let token = crypto.aesEncrypt(JSON.stringify(tokenData), config.TokenKey);
    return token;
}

module.exports = {
    getUserInfo,
    deleteUser,
    registerUser,
    loginUser
}