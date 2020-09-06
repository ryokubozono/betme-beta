const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firestore = admin.firestore();
const nodemailer = require("nodemailer");

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

const mailTransport = nodemailer.createTransport({
  // service: "gmail",
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

const addMediaContents = (data) => {
  return `以下の内容でBetMeよりお問い合わせを受け付けました。
  メールアドレス： ${data.email}
  件名： ${data.subject}
  本文： ${data.content}
  `;
}

module.exports = functions.https.onCall((data, context) => {
  let adminMail = {
    from: gmailEmail,
    to: adminEmail,
    subject: "BetMe Contact",
    text: addMediaContents(data)
  };
  mailTransport.sendMail(adminMail, (err, info) => {
    if (err) {
      return console.error(`send failed. ${err}`);
    }
    return console.log("send success.");
  });
});