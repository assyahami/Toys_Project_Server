var express = require('express');
const userController = require('../controllers/users.Controlle');
var router = express.Router();
const { body } = require("express-validator")


/* GET users listing. */
router.post('/register', [
    body('username')
        .exists()
        .withMessage('USERNAME MISSING')
        .notEmpty()
        .withMessage("Please provide a username"),
    body('phone').exists()
        .withMessage('PHONE MISSING')
        .notEmpty()
        .withMessage("Please provide a phone number")
        .isMobilePhone()
        .withMessage("Invalid mobile number")
        .isLength({
            min: 10,
            max:10
        })
        .withMessage("Invalid mobile number")
    ,
    body('password')
        .exists()
        .withMessage('PASSWORD MISSING')
        .not()
        .isEmpty()
        .withMessage('Please provide a password')
        .isLength({
            min: 5
        })
        .withMessage('Password too short at least 5 charcters')
], userController.registerUser);

router.post('/login', [
    body('phone').exists()
        .withMessage('PHONE MISSING')
        .notEmpty()
        .withMessage("Please provide a phone number"),
    body('password')
        .exists()
        .withMessage('PASSWORD MISSING')
        .not()
        .isEmpty()
        .withMessage('Please provide a password')
        .isLength({
            min: 5
        })
        .withMessage('Password too short at least 5 charcters')
], userController.loginUser);

module.exports = router;
