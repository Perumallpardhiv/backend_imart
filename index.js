const app = require('./app');
const db = require('./config/db');
const UserModel = require('./model/user_model');
const CategoryModel = require('./model/category_model');
const ProductModel = require('./model/product_model');
const CartModel = require('./model/cart_model');
const SubCategoryModel = require('./model/subCategory_model');
const AddressModel = require('./model/address_model');
const OrderModel = require('./model/order_model');
const VendorModel = require('./model/vendor_model');
const PaymentModel = require('./model/payments_model');
const AdminModel = require('./model/admin_model');
const OrderListModel = require('./model/orderList_model');

const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World !!")
});

app.listen(port, ()=>{
    console.log(`Server Listening on Port http://localhost:${port}`);
});
