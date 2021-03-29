const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");

require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;

  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "stage":
        this.link = config.stage;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }

  #createTemplate(verificationToken) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "cerberus",
      product: {
        name: "Phonebook",
        link: this.link,
      },
    });
    const template = {
      body: {
        intro: "Welcome to phonebook",
        action: {
          instructions: "To get started with phonebook click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/auth/verify/${verificationToken}`,
          },
        },
        outro:
          "If you have any problems, contact us, we are happy to help you.",
      },
    };

    return mailGenerator.generate(template);
  }

  async sendEmail(verificationToken, email) {
    const emailBody = this.#createTemplate(verificationToken);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "olya.onysko@gmail.com",
      subject: "Confirmation of registration",
      html: emailBody,
    };
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
