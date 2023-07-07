const OrderModel = require('../model/order_model');

class OrderService {
    static async addOrder(userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date,delivereddate) {
        try {
            console.log(`userId: ${userId}`);
            console.log(`addressId: ${addressId}`);
            const createOrder = new OrderModel({userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status,mobile, date, delivereddate});
            return await createOrder.save();
        } catch (e) {
            throw e;
        }
    }

    static async allUserOrders(userId) {
        try {
            const allUserOrders = await OrderModel.find({userId});
            return allUserOrders;
        } catch (e) {
            throw e;
        }
    }

    static async allOrders() {
        try {
            const allOrders = await OrderModel.find();
            return allOrders;
        } catch (e) {
            throw e;
        }
    }

    static async orderStatus(id, status, delivereddate) {
        try {
            const order = await OrderModel.findByIdAndUpdate(id, {status:status, delivereddate:delivereddate}, {new:true});
            return order;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = OrderService;
