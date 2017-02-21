var express  = require('express');
var mongoose = require('mongoose');
var router   = express.Router();
var jwt      = require('jwt-simple');

var multer   = require('multer');
var path     = require('path');

//Get Required Model

var User = require(__base + 'app/models/users');
var config = require(__base + 'app/config/database');











//Register Api
router.post('/register' , function(req,res){
	if(!req.body.email || !req.body.password || !req.body.firstname || !req.body.type){
		res.status(400).send({success : false , msg : "Invalid Parameters "});
	}else{

		//create user instance
		var newUser = new User({
			type : req.body.type,
			password : req.body.password,
			email    : req.body.email,
			firstName : req.body.firstName,
			lastName : (req.body.lastName)?req.body.lastName:" ",
		});


		newUser.save(function(err,user){
			if(!err){
				
						res.status(200).send({success: true , data : user});
					
				
			}else{
				res.status(400).send({success: false , msg :err});
			}
		});


		
	}
});

apiRoutes.post('/fb/login' , function(req,res){
  if(!req.body.fbid || !req.body.email || !req.body.user_type || !req.body.access_token){
    res.send({success: false, msg: 'Invalid parameters'});
  }else{

    //console.log("Access token is "+ req.body.access_token);
        request({
        url : 'https://graph.facebook.com/me?fields=name'+'&access_token='+req.body.access_token,
        method : 'GET',
      },function(error , response ,body){
        if (error) { 
          console.error(error, response, body);
          res.send({success : false , msg:error});
        }
        else if (response.statusCode >= 400) { 
          console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
          res.status(response.statusCode).send({success : false , msg:response.statusMessage});
        }
        else {
            console.log(body);
            if(req.body.user_type == 'fan'){

              User.findOne({
                username: req.body.email
              }, function(err, user) {
                if (err) throw err;
            
                if (!user) {
                  var newUser = new User({
                    username : req.body.email,
                    userType : 'fan'
                  });

                  newUser.save(function(err , user){
                    if(!err){
                      var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                      var token = jwt.encode(tokenData, config.secret);
                       if(req.body.platformName && req.body.deviceId){
                        console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                        
                              var newMobileToken = new MobileToken({
                                userId : user._id,
                                platform : req.body.platformName,
                                mobileToken :req.body.deviceId
                              });

                              newMobileToken.save(function(err,data){
                                if(!err){
                                  res.json({success: true, token: 'JWT ' + token , id : user._id});
                                }else{
                                  res.send({success: false, msg: 'User type doest not match'});
                                }
                              });
                            }
                          
                      



                    }else{
                      console.log("error while saving user ");
                      console.log(err);
                      res.status(400).send({success :  false , msg:err});
                    }
                  });


                } else {

                  //
                    var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                    var token = jwt.encode(tokenData, config.secret);
                  // return the information including token as JSON

                    if(req.body.platformName && req.body.deviceId){
                      console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                      MobileToken.find({userId:user._id},function(err,data){
                        if(!err){
                          if(data.length != 0){
                            MobileToken.update({userId:user._id,platform :req.body.platformName},{$set:{mobileToken : req.body.deviceId}},function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }else{
                            var newMobileToken = new MobileToken({
                              userId : user._id,
                              platform : req.body.platformName,
                              mobileToken :req.body.deviceId
                            });

                            newMobileToken.save(function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }
                        }else{
                          res.status(500).send({success:false , msg : err});
                        }
                      });
                    }
                  //


                }
              });

            }else{


                Band.findOne({
                username: req.body.email
              }, function(err, user) {
                if (err) throw err;
            
                if (!user) {
                  var newBand = new Band({
                    username : req.body.email,
                    userType : 'band'
                  });

                  newBand.save(function(err , user){
                    if(!err){
                      var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                      var token = jwt.encode(tokenData, config.secret);
                       if(req.body.platformName && req.body.deviceId){
                        console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                        
                              var newMobileToken = new MobileToken({
                                userId : user._id,
                                platform : req.body.platformName,
                                mobileToken :req.body.deviceId
                              });

                              newMobileToken.save(function(err,data){
                                if(!err){
                                  res.json({success: true, token: 'JWT ' + token , id : user._id});
                                }else{
                                  res.send({success: false, msg: 'User type doest not match'});
                                }
                              });
                            }
                          
                      



                    }else{
                      res.status(400).send({success :  false , msg:err});
                    }
                  });


                } else {

                  //
                    var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                    var token = jwt.encode(tokenData, config.secret);
                  // return the information including token as JSON

                    if(req.body.platformName && req.body.deviceId){
                      console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                      MobileToken.find({userId:user._id},function(err,data){
                        if(!err){
                          if(data.length != 0){
                            MobileToken.update({userId:user._id,platform :req.body.platformName},{$set:{mobileToken : req.body.deviceId}},function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }else{
                            var newMobileToken = new MobileToken({
                              userId : user._id,
                              platform : req.body.platformName,
                              mobileToken :req.body.deviceId
                            });

                            newMobileToken.save(function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }
                        }else{
                          res.status(500).send({success:false , msg : err});
                        }
                      });
                    }


                  //
                }
              });


            }
        }
      });
  }
}); 


apiRoutes.post('/google/login' , function(req,res){

  console.log(req.body);
  if(!req.body.access_token){
    res.send({success: false, msg: 'Invalid parameters'});

  }else{
    var token = req.body.access_token;
  google_client.verifyIdToken(
    token,
    G_CLIENT_ID,
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
    function(e, login) {

      if(e){  
        res.send({msg :  e});
      }else{
         var payload = login.getPayload();
        console.log(payload);
        var userid = payload['sub'];
        // If request specified a G Suite domain:
        //var domain = payload['hd'];

        
        if(req.body.user_type=='fan'){

          //User type is fan

          User.findOne({
                username: req.body.email
              }, function(err, user) {
                if (err) throw err;
            
                if (!user) {
                  var newUser = new User({
                    username : req.body.email,
                    userType : 'fan'
                  });

                  newUser.save(function(err , user){
                    if(!err){
                      var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                      var token = jwt.encode(tokenData, config.secret);
                       if(req.body.platformName && req.body.deviceId){
                        console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                        
                              var newMobileToken = new MobileToken({
                                userId : user._id,
                                platform : req.body.platformName,
                                mobileToken :req.body.deviceId
                              });

                              newMobileToken.save(function(err,data){
                                if(!err){
                                  res.json({success: true, token: 'JWT ' + token , id : user._id});
                                }else{
                                  res.send({success: false, msg: 'User type doest not match'});
                                }
                              });
                            }
                          
                      



                    }else{
                      console.log("error while saving user ");
                      console.log(err);
                      res.status(400).send({success :  false , msg:err});
                    }
                  });


                } else {

                  //
                    var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                    var token = jwt.encode(tokenData, config.secret);
                  // return the information including token as JSON

                    if(req.body.platformName && req.body.deviceId){
                      console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                      MobileToken.find({userId:user._id},function(err,data){
                        if(!err){
                          if(data.length != 0){
                            MobileToken.update({userId:user._id,platform :req.body.platformName},{$set:{mobileToken : req.body.deviceId}},function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }else{
                            var newMobileToken = new MobileToken({
                              userId : user._id,
                              platform : req.body.platformName,
                              mobileToken :req.body.deviceId
                            });

                            newMobileToken.save(function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }
                        }else{
                          res.status(500).send({success:false , msg : err});
                        }
                      });
                    }
                  //


                }
              });



        }else{


          //Start

                Band.findOne({
                username: req.body.email
              }, function(err, user) {
                if (err) throw err;
            
                if (!user) {
                  var newBand = new Band({
                    username : req.body.email,
                    userType : 'band'
                  });

                  newBand.save(function(err , user){
                    if(!err){
                      var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                      var token = jwt.encode(tokenData, config.secret);
                       if(req.body.platformName && req.body.deviceId){
                        console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                        
                              var newMobileToken = new MobileToken({
                                userId : user._id,
                                platform : req.body.platformName,
                                mobileToken :req.body.deviceId
                              });

                              newMobileToken.save(function(err,data){
                                if(!err){
                                  res.json({success: true, token: 'JWT ' + token , id : user._id});
                                }else{
                                  res.send({success: false, msg: 'User type doest not match'});
                                }
                              });
                            }
                          
                      



                    }else{
                      res.status(400).send({success :  false , msg:err});
                    }
                  });


                } else {

                  //
                    var tokenData ={};
                      tokenData._id = user._id;
                      tokenData.username = user.username;
                      tokenData.password = user.password;
                      tokenData.userType = user.userType;
                    var token = jwt.encode(tokenData, config.secret);
                  // return the information including token as JSON

                    if(req.body.platformName && req.body.deviceId){
                      console.log('platform is :'+req.body.platformName + ' device ID : '+req.body.deviceId);

                      MobileToken.find({userId:user._id},function(err,data){
                        if(!err){
                          if(data.length != 0){
                            MobileToken.update({userId:user._id,platform :req.body.platformName},{$set:{mobileToken : req.body.deviceId}},function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }else{
                            var newMobileToken = new MobileToken({
                              userId : user._id,
                              platform : req.body.platformName,
                              mobileToken :req.body.deviceId
                            });

                            newMobileToken.save(function(err,data){
                              if(!err){
                                res.json({success: true, token: 'JWT ' + token , id : user._id});
                              }else{
                                res.send({success: false, msg: 'User type doest not match'});
                              }
                            });
                          }
                        }else{
                          res.status(500).send({success:false , msg : err});
                        }
                      });
                    }


                  //
                }
              });

          //end
        }




      }
     
    });
  }
});

router.post('/login' , function(req, res){
	if(!req.body.email|| !req.body.password){
		res.status(400).json({
			success : false ,
			msg : "Invalid parameters"
		});
	}else{

		//var populateQuery = [{path:'rank'},{path:'department'},{path:'reportsTo'}];

		User.findOne({email : req.body.email})
			.exec(function(err , user){
			if (err) throw err;
         
            if (!user) {
              res.status(400).send({success: false, msg: 'Authentication failed. User not found.'});
            }else{

				//console.log(user.username);
            	user.comparePassword(req.body.password , function(err , isMatch){
            		if(!err && isMatch){
            			var tokenData ={};
	                      tokenData._id = user._id;
	                      tokenData.username = user.username;
	                      tokenData.password = user.password;
	                      tokenData.type = user.type;
						  
	                    var token = jwt.encode(tokenData, config.secret);
            			
						
							res.status(200).json({success : true , data :{
								id : user._id ,
								email : user.email,
								type : user.type,
								auth_token : 'JWT '+token
							}});
						
						
						
						
						
            		}else{
            			res.status(400).send({success: false, msg: 'Authentication failed.Password do not match'});
            		}
            	});
            }
		});
	}
});





module.exports = router;