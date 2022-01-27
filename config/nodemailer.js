const nodeMailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');

// transporter defines the configuration using which i will be sending emails
let transporter = nodeMailer.createTransport({
    service : 'gmail',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'process.env.USER', // type email here
        pass : 'process.env.PASSWORD', // type password here
    }
});


let renderTemplate = (data,relativePath) => {
    // stores  what all html is going to be stored in mail
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data, // content which we pass to ejs
        function(err,template){
            if(err){
                console.log('error in rendering template');
                return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}