const mailer = require("../src/nodemailer");
const nodemailer = require("nodemailer");

const sendMail = async (from, to, subject, text, html) => {
  const transporter = await mailer();
  let info = await transporter.sendMail({
    from: from,
    to: to,
    subject: subject,
    text: text,
    // html: html,
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  console.log("Message sent to %s", to);
};

module.exports = {
  sendMail: sendMail,

  sendMailFromNotification: async (notification) => {
    await sendMail(
      "amancvtesting@gmail.com",
      notification.notif_to,
      notification.title,
      notification.description,
      ""
    );
  },
};
