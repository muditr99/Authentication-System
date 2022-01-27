const User = require('../../../models/user');

const jwt = require('jsonwebtoken');


module.exports.index = function(req, res){

    User.find({}, function(err, users){
        // console.log(users);
        return res.json(200, {
            message : 'list of users',
            users : users,
        })
    })
   
}

module.exports.delete = function(req, res){
    
    let id = req.params.id;
    // console.log(id);
    User.findByIdAndDelete(id, function(err){
        if(err){
            console.log("error in deleting the contact", err);
            return;
        }
        return res.redirect('/api/v1/users');
    });
}


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email : req.body.email});
        if( !user || user.password != req.body.password ){
            return res.json(422, {
                message : 'Invalid Username/Password',
            })
        }

        return res.json(200, {
            message : 'sign in successful',
            data : {
                token : jwt.sign(user.toJSON(), process.env.TOKEN , {expiresIn : '100000'}),
            }
        })
    }
    catch(err){
        console.log('*****', err);
        return res.json(500, {
            message : 'Internal server error',
        })
    }
}
