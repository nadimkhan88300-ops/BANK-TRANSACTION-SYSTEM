require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"backend-project" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });



    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendregisteremail(useremail, name) {
    const subject = 'Welcome to backend project!;';
    const text = `Hello ${name},\n\nThank you for registering at Backend project. we're existed to have you on board!\n\nbest regards,\nthe backend project team',
    const html = '<p>hello ${name},<p><p>thank you for registering at backend project we're exited to have you on board!</P><P>Best regards,<br>the backend project team</p';
    await sendEmail(useremail, subject, text, html);
}

module.exports = {
 sendEmail, sendregisteremail
  };