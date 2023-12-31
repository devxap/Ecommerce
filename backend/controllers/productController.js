const Product=require("../models/productModels");
const ErrorHandler=require("../utils/errorhandler")
const catchAysncErrors=require("../middleware/catchAysncErrors")
const ApiFeatures = require("../utils/apifeatures")

exports.createProduct =catchAysncErrors(async (req,res,next)=>{
    req.body.user=req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })
});

exports.getAllProducts= catchAysncErrors(async (req,res)=>{
    
    const resultPerPage=5;
    const productCount=await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products= await apiFeature.mongoQuery;

    res.status(200).json({
        success:true,
        products
    })
});

// exports.deleteAllProducts=catchAysncErrors(async (req,res,next)=>{
//     await Product.deleteMany({});
    
//     res.status(200).Json({
//         success:true,
//         message:"All products deleted successfully"
//     })
// })

exports.updateProduct = catchAysncErrors(async (req,res,next)=>{
    let product=await Product.findById(req.params.id);
    if(!product){
        return res.status(500).json({
            success:true,
            message:"Product not found"
        })
    }

    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    })
}
)


exports.deleteProduct = catchAysncErrors(async (req, res, next) => {
    const productId = req.params.id;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        });
    }

    // Delete the product
    await Product.findByIdAndDelete(productId);

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });

});

exports.getProductDetails = catchAysncErrors( async (req, res, next) => {
    
    const productID = req.params.id;
    const product = await Product.findById(productID);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    return res.status(200).json({
        success: true,
        product
    });

});

exports.createProductReview=catchAysncErrors( async(req,res,next)=>{
    const {rating, comment, productID}= req.body;

    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    }

    const product = await Product.findById(productID);
    
    const isReviewed= product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());
    if(!isReviewed){
        product.reviews.forEach(rev=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating), (rev.comment=comment);
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }
    let avg=0;

        product.reviews.forEach((rev)=>{
            avg+= rev.rating;
        }) 
        
        
    product.ratings = avg / product.reviews.length;

        await product.save({validateBeforeSave:false});

        res.status(200).json({
            success:true,

        })
})