const PaymentService = require('../services/payment_services');

exports.addpayment = async(req,res,next)=>{
    try {
        const {userId, orderId, name, grandTotal, paymentMethod, mobile, paymentdate} = req.body;
        const newPayment = await PaymentService.addPayment(userId, orderId, name, grandTotal, paymentMethod, mobile, paymentdate);
        res.json({status:1, message:"New Payment Added"});
        console.log("New Payment Added");
    } catch (er) {
        res.json({status:0, message:"Adding Payment Failed"});
        console.log("Adding Payment failed");
        throw er
    }
}

exports.allpayments = async (req,res,next)=>{
    try{
        let payments = await PaymentService.allPayments();
        res.json({status:1, message:"All Payments fetched", data:payments});
        console.log("Got all Payments");
    } catch (e){
        res.json({status:0, message:"Payments not fetched"});
        console.log("Not found Payments");
        throw e;
    }
}
