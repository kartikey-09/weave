const sendMail = require('./sendEmail');

// -----------------------------------------Function : Generate OTP----------------------------------------------
exports.generateOTP = async () => {
  // generate 6 digit random otp
  return Math.floor(100000 + Math.random() * 900000);
};

// -----------------------------------------------------Sending Mails----------------------------------------------
// send mail to user
exports.sendMailToUser = async(mailArray, subject, text) => {
    await sendMail(mailArray, subject, text);
}
// send mail to organisation
exports.sendsMailToOrganisation = async(subject, text) => {
    await sendMail("shubhabc111@gmail.com", subject, text);
}

// -----------------------------------------Template for OTP Verification of the Account-------------------------
exports.textTemplateForNewAccoundVerification = (OTP) => {
  return `
    <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>OTP Notification</title>
       <style>
           /* Styling for the container */
           .container {
               background-color: #f2f2f2;
               padding: 20px;
               border-radius: 10px;
               text-align: center;
               font-family: Arial, sans-serif;
           }
   
           /* Styling for the OTP code */
           .otp-code {
               font-size: 24px;
               font-weight: bold;
               color: #007BFF;
               margin-bottom: 20px;
           }
   
           /* Styling for the message */
           .message {
               font-size: 18px;
               color: #333;
           }
       </style>
   </head>
   <body>
       <div class="container">
           <p class="otp-code">OTP: ${OTP}</p>
           <p class="message">OTP sent from WeAvecU</p>
       </div>
   </body>
   </html>
    `;
};

// -----------------------------------------Template for Send OTP-------------------------
exports.textTemplateForSendOTP = (OTP) => {
    return `
      <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>OTP Notification</title>
         <style>
             /* Styling for the container */
             .container {
                 background-color: #f2f2f2;
                 padding: 20px;
                 border-radius: 10px;
                 text-align: center;
                 font-family: Arial, sans-serif;
             }
     
             /* Styling for the OTP code */
             .otp-code {
                 font-size: 24px;
                 font-weight: bold;
                 color: #007BFF;
                 margin-bottom: 20px;
             }
     
             /* Styling for the message */
             .message {
                 font-size: 18px;
                 color: #333;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <p class="otp-code">OTP: ${OTP}</p>
             <p class="message">OTP sent from WeAvecU</p>
         </div>
     </body>
     </html>
      `;
};

// ----------------------------------------Template : sending clinic booking request initialisation to user-----------------
exports.textTemplateInitClinicBookingForUser = (userDetails) => {
    return `
      <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Clinic Session</title>
     </head>
     <body>
         <div class="container">
             <p>Your booking request has been successfully initiated. Our team will contact you soon and provide you with the slot time and date via email.</p>
             <br/>
             <h2>Your Details</h2>
             <p>Name : ${userDetails?.name}</p>
             <p>Email : ${userDetails?.email}</p>
             <p>Age : ${userDetails?.age}</p>
             <p>Whatsapp No : ${userDetails?.whatsappNo}</p>
             <p>Mode : ${userDetails?.mode}</p> 
             <p>Description : ${userDetails?.description}</p>
         </div>
     </body>
     </html>
      `;
}

// ----------------------------------------Template : sending clinic booking request initialisation to organisation---------
exports.textTemplateInitClinicBookingForOrg = (userDetails) => {
    return `
      <!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>New request arive for  Clinic Session</title>
     </head>
     <body>
         <div class="container">
             <p>New request for clinic session is arived.</p>
             <br/>
             <h2>User Details</h2>
             <p>Name : ${userDetails?.name}</p>
             <p>Email : ${userDetails?.email}</p>
             <p>Age : ${userDetails?.age}</p>
             <p>Whatsapp No : ${userDetails?.whatsappNo}</p>
             <p>Mode : ${userDetails?.mode}</p> 
             <p>Description : ${userDetails?.description}</p>
         </div>
     </body>
     </html>
      `;
}

// -----------------------------------------Template : sending slot time to the user--------------------------------------
exports.textTemplateSlotTimeForUser = (userDetails, flag)=>{};