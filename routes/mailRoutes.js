const express = require("express");
const nodemailer = require("nodemailer");
const Mail = require("../models/Mail");

const router = express.Router();

router.post("/send", async (req, res) => {
  const { subject, body, recipients } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients,
      subject,
      text: body,
    });

    await Mail.create({
      subject,
      body,
      recipients,
      status: "Sent",
    });

    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send emails" });
  }
});

router.get("/history", async (req, res) => {
  const mails = await Mail.find().sort({ createdAt: -1 });
  res.json(mails);
});

module.exports = router;
