const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {productValidator} = require('../middleware/productValidator');
const {adminValidator} = require('../middleware/adminValidator');
const {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct} = require("../controllers/productControllers");



// router.get('/', getProduct)
// router.post('/',createProduct )
// router.put('/:id',updateProduct )
// router.delete('/:id',deleteProduct )

router
.route("/")
.get(protect,getProduct)
.post(protect,productValidator,createProduct)
router.route("/:id").put(protect,updateProduct).delete(protect,deleteProduct)

// for admin
router.get("/getAllProducts", protect, adminValidator, getAllProducts)

module.exports = router;