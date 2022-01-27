const nodeMailer = require('../config/nodemailer');
const User = require('../models/user');


exports.newPassword = (user) => { 
    // console.log('usersMailer', user);

    // used for setting the ejs file inside mail 
    let htmlString = nodeMailer.renderTemplate({user : user}, '/user/user_password.ejs');
    
  //  sends the mail to user and also provide response to server
    nodeMailer.transporter.sendMail({
        from : process.env.FROM,
        to : user.email,
        subject : ' Password Reset E-mail',
        text : 'click on below link to reset your password:)',
        html : htmlString,
    }, (err,info) => {
        if(err){
            console.log('Error in Sending mail' , err);
            return;
        }

        // console.log('Message Sent' , info);
        return;
    })

}
