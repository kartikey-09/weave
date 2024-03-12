const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_SENDER_EMAIL,
    pass: process.env.SMTP_SENDER_PASSWORD
  }
});

const sendMail = (mailArray, subject, text) => {
  return new Promise((resolve, reject) => {
    let mailOptions = {
      from: `WeAvecU <${process.env.SMTP_SENDER_EMAIL}>`,
      to: mailArray,
      subject: subject,
      html: text
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
        console.log('failed.....');
        reject(err); // Reject the promise with the error
      } else {
        console.log('Email Sent : ' + info.response);
        console.log('mail sent successful.....');
        resolve(info); // Resolve the promise with the info
      }
      transporter.close();
    });
  });
};

module.exports = sendMail;
