var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Classified = new Schema({
	title : {
        type:String,
        required : true ,
    },
    content : {
        type : String 
    },
    image : {
        type : String,
        required : true
    },
    date :{
        type:Date,
        default:Date.now()
    },
    userApproved :{
        type : Boolean,
        default : false
    },
    isFeatured: {
        type:Boolean ,
        default : true
    }
           
},{
    timestamps: true
});



module.exports = mongoose.model('Classified', Classified);