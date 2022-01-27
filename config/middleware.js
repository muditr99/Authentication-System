// middleware used to set res.locals so that we get notification onto the screen
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error'),
    }
    
    next();
}