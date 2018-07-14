let Order = require('../model/order');
let productService = require('../service/product');
let Big = require('big.js');
let config = require('../config');

async function addOrder(order) {
    let p = await productService.getProductById(order.productId);

    if (p.stock < order.count) {
        throw Error('商品库存不够');
    }
    ;
    order.productName = p.name;
    order.productPrice = p.price;
    order.totalPrice = Big(order.productPrice).times(order.count);


    let o = await Order.create(order);
    await productService.updateProduct(p._id, {stock: p.stock - order.count});
    return o;
}

async function getOrderByPage(page = 1) {
    return await Order.find().skip((page - 1) * config.PageCount).limit(config.PageCount)
        .sort("created").select("-__v");
}

module.exports = {
    addOrder,
    getOrderByPage
}