require("dotenv").config();

const generateToken = () => {
  const xendit_api_key = process.env.XENDIT_KEY + ":";
  const base64 = Buffer.from(xendit_api_key).toString("base64");
  console.log("xendit_key", xendit_api_key);
  return base64;
};

exports.xenditHeaders = {
  Authorization: "Basic " + generateToken(),
  "Content-Type": "application/json",
};
