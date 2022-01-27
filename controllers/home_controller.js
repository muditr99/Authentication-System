// displays/render the home page of the app
module.exports.home = function(req, res){
    // return res.end('<h1>response from home controller</h1>');
    return res.render('home', {
        title : 'Home',
    });
}