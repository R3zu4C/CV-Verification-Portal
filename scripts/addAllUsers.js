// Run 'npm run dev:users' command to add all user data

const fastcsv = require("fast-csv");
const fs = require("fs");
const {User }= require("../models");
const {sequelize} = require("../database/connection");

const addAllUsers = async () => {
  try {
    let stream = fs.createReadStream("./scripts/users.csv");
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", (data) => {
        if (data[2].match(/[1][8-9]\d{7}|[2]\d{8}/)) {
          csvData.push(data);
        }
      })
      .on("end", () => {
        csvData.shift();
        csvData.forEach(async (data) => {
          try {
            await User.create({
              user_id: data[3],
              roll_no: data[2],
              name: data[1],
              branch: data[8],
              program: data[7],
            });
          } catch (err) {
            console.log(err);
          }
        });
      });
    await stream.pipe(csvStream);
    console.log("All user data added to database successfully.");
  } catch (err) {
    console.log(err);
  }
};

addAllUsers();
