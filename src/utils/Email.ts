import nodemailer from "nodemailer";
import * as fs from "fs";
import path from "path";
import config from "config";

type Templates = {
  welcome: string;
  resetPassword: string;
};

const templates: Templates = {
  welcome: fs.readFileSync(
    path.join(__dirname, "emails", "welcome.html"),
    "utf8"
  ),
  resetPassword: fs.readFileSync(
    path.join(__dirname, "emails", "reset-password.html"),
    "utf8"
  ),
};

type User = {
  firstName: string;
  email: string;
};

class Email {
  private to: string;
  private firstName: string;
  private url: string;
  private from: string;

  constructor({ firstName, email }: User, url: string) {
    this.to = email;
    this.firstName = firstName;
    this.url = url;
    this.from = config.get<string>("emailFrom");
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.get<string>("gmailAdress"),
          pass: config.get<string>("gmailPass"),
        },
        tls: { rejectUnauthorized: false },
      });
    }

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "bo.kohler81@ethereal.email",
        pass: "C21kZ2Bs7gm85ampWM",
      },
      tls: { rejectUnauthorized: false },
    });
  }
  prepareHtmlTemplate(HtmlTemplate: keyof Templates, subject: string) {
    let template = templates[HtmlTemplate];
    template = template.replace(/{SUBJECT}/g, subject);
    template = template.replace(/{FIRST_NAME}/g, this.firstName);
    template = template.replace(/{URL}/g, this.url);
    return template;
  }
  async send(template: keyof Templates, subject: string) {
    const newTemp = this.prepareHtmlTemplate(template, subject);
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: newTemp,
    };

    await this.newTransport().sendMail(mailOptions);
  }
  async sendWelcomeMail() {
    await this.send(
      "welcome",
      "Account activation link (valid for only 10 minutes)"
    );
  }
  async sendPasswordResetMail() {
    await this.send(
      "resetPassword",
      "You password reset token (valid for only 10 minutes)"
    );
  }
}
