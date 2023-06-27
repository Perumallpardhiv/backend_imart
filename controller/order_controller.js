const OrderService = require('../services/order_service');

exports.addOrder = async(req,res,next)=>{
    try {
        const {userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date} = req.body;
        const newOrder = await OrderService.addOrder(userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date);
        res.json({status:1, message:"New Order Added"});
        console.log("New Order Added");
    } catch (er) {
        res.json({status:0, message:"Adding Order Failed"});
        console.log("Adding Order failed");
        throw er
    }
}

exports.allOrders = async (req,res,next)=>{
    try{
        const {userId} = req.body;
        let orders = await OrderService.allOrders(userId);
        res.json({status:1, message:"All Orders fetched", data:orders});
        console.log("Got all Orders");
    } catch (e){
        res.json({status:0, message:"Orders not fetched"});
        console.log("Not found Orders");
        throw e;
    }
}
