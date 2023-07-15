const OrderListService = require('../services/orderList_services');

exports.addOrderList = async(req,res,next)=>{
    try {
        const {userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date,delivereddate} = req.body;
        const newOrder = await OrderListService.addOrderList(userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date, delivereddate);
        res.json({status:1, message:"New Order List Added"});
        console.log("New Order List Added");
    } catch (er) {
        res.json({status:0, message:"Adding Order List Failed"});
        console.log("Adding Order List Failed");
        throw er;
    }
}

exports.orderListSpecificOrder = async (req,res,next)=>{
    try{
        const {orderId} = req.body;
        let orderList = await OrderListService.orderListSpecificOrder(orderId);
        res.json({status:1, message:"Order List fetched", data:orderList});
        console.log("Got Order List");
    } catch (e){
        res.json({status:0, message:"Order List not fetched"});
        console.log("Not found Order List");
        throw e;
    }
}
