// import { Global } from "../src/global";

// console.log(Global.USER_SETTINGS);
// Global.USER_SETTINGS.userAccount = "1234";
// console.log(Global.USER_SETTINGS);

// import * as fs from "fs";
const fs = require("fs");
console.log(fs.readFileSync("./docs/headers.js", "utf8"));
