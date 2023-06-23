const AddressModel = require('../model/address_model');

class AddressService {
    static async addAddress(userId, firstName, lastName, mobileNumber, address, city, state, country, zipCode, isDefault) {
        try {
            console.log(`userId: ${userId}`);
            const createProduct = new AddressModel({userId, firstName, lastName, mobileNumber, address, city, state, country, zipCode, isDefault });
            return await createProduct.save();
        } catch (e) {
            throw e;
        }
    }

    static async allAddresses(userId) {
        try {
            const allAddresses = await AddressModel.find({userId});
            return allAddresses;
        } catch (e) {
            throw e;
        }
    }

    static async getDefaultAddress(userId) {
        try {
            const getDefaultAddress = await AddressModel.findOne({userId:userId, isDefault: 1});
            return getDefaultAddress;
        } catch (e) {
            throw e;
        }
    }

    static async updateDefaultAddress(id,userId) {
        try {
            const updateDefaultAddress = await AddressModel.updateMany({userId:userId}, { $set: { isDefault: 0 } });
            const updateDefaultAddress2 = await AddressModel.updateOne({_id:id}, { $set: { isDefault: 1 } });
            return updateDefaultAddress2;
        } catch (e) {
            throw e;
        }
    }

    static async checkAddressExist(userId, address){
        try {
            return await AddressModel.findOne({userId: userId, address: address});
        } catch (e) {
            throw e;
        }
    }

    static async getSpecificAddress(id){
        try {
            return await AddressModel.findById(id);
        } catch (e) {
            throw e;
        }
    }
}

module.exports = AddressService;
