var express = require('express');
var router  = express.Router();

var Classified = require(__base + 'app/models/classified');

//Categories
router.use('/categories' , require('./categories'));

//Sub-Categories
router.use('/subcategories' , require('./subcategories'));

router.post('/' ,function(req,res){
    var newCoupon = new Coupon({
        title : req.body.title ,
        description : req.body.description,
        startDate : req.body.date ,
        contact : req.body.contact,
        category : req.body.category,
        //subcategory : req.body.subcategory ,
        image : req.body.image,
        phone1 : req.body.phone1,
        phone2 : req.body.phone2,
        email:req.body.email
    });

    newCoupon.save(function(err,data){
        if(!err){
                res.status(200).send({
                    success : true ,
                    data : data
                });
            }else{
                res.status(400).send({
                    success :  false ,
                    msg : err
                });
            }
    });


});

router.get('/' , function(req,res){
    Classified.find({})
            .exec(function(err,data){
                if(!err){
                res.status(200).send({
                    success : true ,
                    data : data
                });
            }else{
                res.status(400).send({
                    success :  false ,
                    msg : err
                });
            }
            });
});

router.get('/featured' , function(req,res){
    Classified.find({isFeatured: true})
            .exec(function(err,data){
                if(!err){
                res.status(200).send({
                    success : true ,
                    data : data
                });
            }else{
                res.status(400).send({
                    success :  false ,
                    msg : err
                });
            }
            });
});

router.get('/featured/:id' , function(req,res){
    Classified.update({_id:id},{$set:{isFeatured: true}})
            .exec(function(err,data){
                if(!err){
                res.status(200).send({
                    success : true ,
                    data : data
                });
            }else{
                res.status(400).send({
                    success :  false ,
                    msg : err
                });
            }
            });
});
module.exports = router;

