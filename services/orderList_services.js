const OrderListModel = require('../model/orderList_model');

class OrderListService {
    static async addOrderList(orderId, productName, quantity, mrpPrice, sellPrice, kgOrgm, image) {
        try {
            console.log(`orderId: ${orderId}`);
            const createOrderList = new OrderListModel({orderId, productName, quantity, mrpPrice, sellPrice, kgOrgm, image});
            return await createOrderList.save();
        } catch (e) {
            throw e;
        }
    }

    static async orderListSpecificOrder(orderId) {
        try {
            const orderListSpecificOrder = await OrderListModel.findOne({orderId});
            return orderListSpecificOrder;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = OrderListService;
