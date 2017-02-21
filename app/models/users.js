var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var Users = new Schema({
    firstname : {
        type:String ,
        required : true
    },
    lastname : {
        type : String ,
        
    },
    email : {
        type : String,
        
        required : true
    },
    password : {
        type : String ,
        required : true
    },
    type : {
        type : String ,
        required : true ,
        enum : ['merchant' ,'user'],
        default : 'user'
    },
    activated : {
        type: Boolean ,
        default : false
    },
    isFeatured :{
        type:Boolean ,
        default:true
    }

},{
    timestamps: true
});

Users.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
 
Users.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', Users);
