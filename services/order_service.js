const OrderModel = require('../model/order_model');

class OrderService {
    static async addOrder(userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status, mobile, date) {
        try {
            console.log(`userId: ${userId}`);
            console.log(`addressId: ${addressId}`);
            const createOrder = new OrderModel({userId, addressId, name, subTotal, discoutPrice, grandTotal, paymentMethod, status,mobile, date});
            return await createOrder.save();
        } catch (e) {
            throw e;
        }
    }

    static async allOrders(userId) {
        try {
            const allOrders = await OrderModel.find({userId});
            return allOrders;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = OrderService;
