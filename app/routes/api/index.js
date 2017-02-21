var express = require('express');
var router  = express.Router();

router.get('/' , function(req,res){
	res.send('api routes here');
});

//Users Routes here
router.use('/users' , require('./users'));

//Upload Routes
router.use('/upload' , require('./upload'));





module.exports = router;