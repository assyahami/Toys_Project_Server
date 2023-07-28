const Product = require("../models/Product");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");


const listProducts = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({ message: errResp }, res)

        }
        let send = {}
        let ITEMS_PER_PAGE = 5
        const body = req.body
        const query = {}
        const page = Number(req.query?.page) || 0
        const status = Number(req.query?.status) || 0
        const totalItems = await Product.countDocuments();
        let price = req.query.price


        const getListPatient = await Product.find().skip(page).limit(ITEMS_PER_PAGE).select("-__v")

        send.data = getListPatient
        send.totalItems = getListPatient.length
        send.totalIPage = totalItems
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}


const getProduct = async (req, res, next) => {
    try {
        let send = {}
        const patientID = req.params.id
        const getPatient = await Product.findById(patientID).select("-__v")
        if (!getPatient) {
            return APIRES.getNotFoundMsg("Patient can't found", res)
        }
        APIRES.getSuccessResult(getPatient, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}



module.exports = {
    listProducts,
    getProduct,
}

