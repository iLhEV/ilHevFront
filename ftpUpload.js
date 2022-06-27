const path = require("path");
const FtpDeploy = require("ftp-deploy");
require("dotenv").config();

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT,
  localRoot: path.join(__dirname, "dist"),
  remoteRoot: "/public_html/test",
  deleteRemote: false,
  exclude: [],
  include: ["*"],
  // include: ["**/*", "*", ".*"]
};

const ftpDeploy = new FtpDeploy();

// use with promises
ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished: ", res))
  .catch((err) => console.log("err", err));

// ftpDeploy.on("log", (data) => console.log("[log]", data));
// ftpDeploy.on("uploading", (data) => console.log("[uploading]", data));
// ftpDeploy.on("uploaded", (data) => console.log("[uploaded]", data));
ftpDeploy.on("upload-error", (data) => console.log("[upload-error]", data));
