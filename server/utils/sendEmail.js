const nodeMailer = require('nodemailer');

const sendEmail = async({email,subject,message})=>{
    const transporter = nodeMailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth:{
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.MAIL_ID,
        to: email,
        subject: subject,
        text: message
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;