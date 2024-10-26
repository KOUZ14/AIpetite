/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

//IGNORE -- ATTEMPTED EMAIL CONFIRMATION FUNCTION

/*
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure nodemailer transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "noreply.aipetite@gmail.com",
    pass: "cmpe133@",
  },
});

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const mailOptions = {
    from: "noreply.aipetite@gmail.com",
    to: user.email,
    subject: "Welcome to AIpetite!",
    text: `Hello ${user.displayName || ""},
    \n\nThank you for signing up for AIpetite!
    We're excited to have you on board.
    \n\nBest regards,\nAIpetite Team`,
  };

  return transporter.sendMail(mailOptions)
      .then(() => console.log("Welcome email sent to:", user.email))
      .catch((error) => console.error("Error sending welcome email:", error));
});
*/