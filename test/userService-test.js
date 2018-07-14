require('../db')
let userService = require('../service/user');
async function testRegisterUser() {
    let User = {
        username:'testRegisterUser',
        password:'123',
        age:101,
        role:100
    }
    let res = await userService.registerUser(User);
    console.log(res);
}
async function testFindOne() {
    let res = await userService.getUserInfo('zhangsan');
    console.log(res);
}
async function testLoginUser() {
    let user = {
        username: 'zhangsan',
        password: '1213'
    };
    let res = await userService.loginUser(user);
    console.log(res)
}
async function testDeleteUser() {
    await userService.deleteUser('zhangsan');
}
testRegisterUser();
