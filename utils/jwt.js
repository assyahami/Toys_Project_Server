const apiResponse = require("./apiResponse")

const sendToken = (user) => {
        const generateJWTToken = user.generateJWTToken()
        let response = {
            username:user.username,
            phone:user.phone,
            token: generateJWTToken,
            user_id: user.id
        }
        return response
}

module.exports = {
    sendToken
}