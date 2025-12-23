const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    subject: String,
    body: String,
    recipients: [String],
    status: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mail", mailSchema);
