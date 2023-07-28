const Users = require("../models/Users");
const APIRES = require("../utils/apiResponse")
const { validationResult } = require("express-validator");
const { sendToken } = require("../utils/jwt");

const registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({ message: errResp }, res)
        }
        const body = req.body
        console.log(body, 'boyd');
        const isUserExits = await Users.findOne({ phone: body.phone })
        if (isUserExits) {
            return APIRES.getExistsResult({
                message: "User already exits use different phone number",
                status: false
            }, res)
        }
        const createUser = new Users({
            username: body.username,
            phone: body.phone,
            password: body.password
        }, { versionKey: false })
        createUser.save()
        let getResp = sendToken(createUser)
        let send={}
        send.data=getResp
        send.message="Sucessfully created user"
        console.log(send, 'getResp');
        return APIRES.getSuccessResult(send, res)
    } catch (error) {
        console.log(error, 'error');
        if (error.code == 11000) {
            let message = `${error.keyValue.phone} ${Object.keys(error.keyValue)} already exits please use different phone number`;
            return APIRES.getErrorResult(message, res)
        }
        return APIRES.serverError(error, res)
    }
}


const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            let getErrmsg = errors.array()
            let errResp = Array.isArray(getErrmsg) ? getErrmsg[0].msg : getErrmsg
            return APIRES.getErrorResult({ message: errResp }, res)
        }
        const body = req.body
        const findUser = await Users.findOne({ phone: body.phone }).select("id username phone password")

        if (!findUser) {
            return APIRES.getNotExistsResult("User not be exits", res)
        }
        const isvalidPassword = await findUser.comparePassword(body.password)
        if (!isvalidPassword) {
            return APIRES.getErrorResult({
                message: "Invalid password " + body.password,
                status: false
            }, res)
        }
        console.log(isvalidPassword, 'isvalidPassword');
        let getResp = sendToken(findUser)
        let send={}
        send.data=getResp
        send.message="Sucessfully logged"
        APIRES.getSuccessResult(send, res)
    } catch (error) {
        return APIRES.getErrorResult(error, res)
    }
}




module.exports = {
    loginUser,
    registerUser
}

