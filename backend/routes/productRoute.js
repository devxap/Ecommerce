const express=require('express');
const { getAllProducts, 
        createProduct, 
        updateProduct, 
        deleteProduct, 
        getProductDetails, 
        createProductReview} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router=express.Router();
// router.use(function(req, res, next) {
//         res.header("Access-Control-Allow-Origin", "*");
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         next();
//       });

router.route("/products").get(getAllProducts);

// router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAllProducts);

router.route('/product/new').post(isAuthenticatedUser, createProduct);

router
.route('/product/:id')
.put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser,createProductReview);
module.exports=router