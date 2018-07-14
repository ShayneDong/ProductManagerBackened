require('./db');
require('express-async-errors');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('./config');
let express = require("express");

let app = express();

// 注册日志中间件
app.use(morgan('combined'));
// 注册body-parser中间件
app.use(bodyParser.json());

app.use(require('./middleware/res_md'));
app.use(require('./middleware/token_md'));
app.use(require('./middleware/permission_md'));

app.use('/user', require('./router/user'));
app.use('/category', require('./router/category'));
app.use('/product', require('./router/product'));
app.use('/order', require('./router/order'));

//异常处理中间件
app.use((err, req, res, next) => {
    res.fail(err.toString());
});
app.listen(config.PORT);