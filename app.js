const express = require('express');
const body_parser = require('body-parser');
const userRouter = require('./routes/user_route');
const categoryRouter = require('./routes/category_route');
const subCategoryRouter = require('./routes/subCategory_route');
const productRouter = require('./routes/product_route');
const cartRouter = require('./routes/cart_route');
const addressRouter = require('./routes/address_route');
const orderRouter = require('./routes/order_route');

const app = express();

app.use(body_parser.json());

app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', subCategoryRouter);
app.use('/', productRouter);
app.use('/', cartRouter);
app.use('/', addressRouter);
app.use('/', orderRouter);

module.exports = app;
