const PaymentModel = require('../model/payments_model');

class PaymentService {
    static async addPayment(userId, orderId, name, grandTotal, paymentMethod, mobile, paymentdate) {
        try {
            console.log(`userId: ${userId}`);
            console.log(`orderId: ${orderId}`);
            const createPayment = new PaymentModel({userId, orderId, name, grandTotal, paymentMethod, mobile, paymentdate});
            return await createPayment.save();
        } catch (e) {
            throw e;
        }
    }

    static async allPayments() {
        try {
            const allPayments = await PaymentModel.find();
            return allPayments;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = PaymentService;
