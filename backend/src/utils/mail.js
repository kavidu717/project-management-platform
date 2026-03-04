import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  const mailGenerator = new Mailgen({
    theme: "default",
    product: { name: "Task Manager", link: "https://taskamanagelink.com" },
  });

  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "e7283a8b35df5a",
      pass: "0581ef66c0d330",
    },
  });

  const mail = {
    from: "mail.taskmanager@example.com",
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mail);
    console.log("Mailtrap sent:", info.messageId); // ✅ confirm
  } catch (error) {
    console.error("email service failed. Check Mailtrap credentials.");
    console.log(error);
  }
};

const emailVerificationMailgenContext = (username, verificationUrl) => ({
  body: {
    name: username,
    intro: "Use the following link to verify your email address:",
    action: {
      instructions: "To verify your email address, click on the button:",
      button: { color: "#22BC66", text: "Verify Email Address", link: verificationUrl },
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
  },
});

const forgotPasswordMailgenContext = (username, passwordResetUrl) => ({
  body: {
    name: username,
    intro: "We got a request to reset your password.",
    action: {
      instructions: "Reset your password by clicking the button:",
      button: { color: "#e35f0d", text: "Reset Password", link: passwordResetUrl },
    },
    outro: "Need help, or have questions? Just reply to this email, we'd love to help.",
  },
});

export { emailVerificationMailgenContext, forgotPasswordMailgenContext, sendEmail };