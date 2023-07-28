var express = require('express');
var router = express.Router();
const patientController = require('../controllers/product.Controller');

router.get('/list_products/', patientController.listProducts);
router.get('/get_product/:id', patientController.getProduct);

module.exports = router;
