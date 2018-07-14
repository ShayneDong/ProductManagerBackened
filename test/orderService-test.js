require("../db")
let orderService = require('../service/order');

async function testAddOrder() {
    let o = {
        productId: "5b49a34ef146341704e0a728",
        count: 1,
        productPrice: 1
    };1
    let res = await orderService.addOrder(o);
    console.log(res);
}


async function testGetOrdersByPage() {
    let list = await orderService.getOrderByPage(1)
    console.log(list);
}

testAddOrder()