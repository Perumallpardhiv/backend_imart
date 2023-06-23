const AddressService = require('../services/address_services');

exports.addAddress = async(req,res,next)=>{
    try {
        const {userId, firstName, lastName, mobileNumber, address, city, state, country, zipCode, isDefault} = req.body;
        const addressExist = await AddressService.checkAddressExist(userId, address);
        if(!addressExist){
            const newAddress = await AddressService.addAddress(userId, firstName, lastName, mobileNumber, address, city, state, country, zipCode, isDefault);
            const defaultAddressUpdate = await AddressService.updateDefaultAddress(newAddress.id, userId);
            res.json({status:1, message:"New Address Added and Default Address updated"});
            console.log("Default address updated by adding new address");
        }
        else {
            res.json({status:0, message:"Address already exist"});
            console.log("Address already Exist");
        }
    } catch (er) {
        res.json({status:0, message:"Adding address Failed"});
        console.log("Adding Address failed");
        throw er
    }
}

exports.allAddress = async (req,res,next)=>{
    try{
        const {userId} = req.body;
        let addresses = await AddressService.allAddresses(userId);
        res.json({status:1, message:"All Addresses fetched", data:addresses});
        console.log("Got all Addresses");
    } catch (e){
        res.json({status:0, message:"Getting address Failed"});
        console.log("Not found Addresses");
        throw e;
    }
}

exports.getDefaultAddress = async (req,res,next)=>{
    try{
        const {userId} = req.body;
        let defaultAddress = await AddressService.getDefaultAddress(userId);

        res.json({status:1, message:"Default address", data:defaultAddress});
        console.log("Default address");
    } catch (e){
        res.json({status:0, message:"No got default address"});
        console.log("Not address");
        throw e;
    }
}

exports.updateDefaultAddress = async (req,res,next)=>{
    try{
        const {id, userId} = req.body;
        let updatedProduct = await AddressService.updateDefaultAddress(id, userId);

        res.json({status:1, message:"Address Updated"});
        console.log("Updated Address");
    } catch (e){
        res.json({status:0, message:"Not Updated"});
        console.log("Not Updated");
        throw e;
    }
}

exports.getSpecificAddress = async (req,res,next)=>{
    try {
        const {id} = req.body;
        let address = await AddressService.getSpecificAddress(id);

        res.json({status:1, message:"Address got", data:address});
        console.log("Address got");
    } catch (e) {
        res.json({status:0, message:"No Address"});
        console.log("No Address");
        throw e;
    }
}
