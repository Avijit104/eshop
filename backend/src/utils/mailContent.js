import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const emailVerificationMail = (username, url) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Ethnicity",
      action: {
        intstructions:
          "To verifiy your registered email id please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verifiy Email",
          link: url,
        },
      },
      outro: "Need help, or have questions? Just reply to this email",
    },
  };
};
const resetPasswordMail = (username, url) => {
  return {
    body: {
      name: username,
      intro: "Welcome to Ethnicity",
      action: {
        intstructions:
          "To change your password please click on the following button",
        button: {
          color: "#22BC66",
          text: "Verifiy Email",
          link: url,
        },
      },
      outro: "Need help, or have questions? Just reply to this email",
    },
  };
};

const mailSender = async (option) => {
  const mailgen = new Mailgen({
    theme: "default",
    product: {
      name: "Ethnicity",
      link: "https://Ethnicity.com",
    },
  });

  const emailText = mailgen.generatePlaintext(option.mailgenContent);
  const emailHtml = mailgen.generate(option.mailgenContent);

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mail = {
    from: "mail.ethenicity@example.com",
    to: option.email,
    subject: option.subject,
    text: emailText,
    html: emailHtml,
  };

  try {
    await transport.sendMail(mail);
  } catch (error) {
    console.log("mail sender error", error);
  }
};

export { emailVerificationMail, resetPasswordMail, mailSender };
