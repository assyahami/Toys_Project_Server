const fs = require("fs")
const Products = require("../models/Product")

const importProducts = async () => {
    try {
        const getProductFile = await fs.readFileSync("./products.json")
        const covertParse = JSON.parse(getProductFile)
        await Products.insertMany(covertParse,{wtimeout:30000})
        console.log("_____PRODUCTS IMPORTED_______");
    } catch (error) {
        console.log(error);
        console.log("_____PRODUCTS IMPORTED ERROR_______");

    }
}

importProducts()