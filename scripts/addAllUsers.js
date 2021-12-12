// Run 'npm run dev:users' command to add all user data

const fastcsv = require("fast-csv");
const fs = require("fs");
const User = require("../models/User");
const sequelize = require("../database/connection");

const addAllUsers = async () => {
  try {
    let stream = fs.createReadStream("./scripts/users.csv");
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", (data) => {
        if (data[2].match(/^\d{9}$/)) {
          csvData.push(data);
        }
      })
      .on("end", () => {
        csvData.shift();
        csvData.forEach(async (data) => {
          try {
            await User.create({
              s_id: data[2],
              name: data[1],
              mail: data[3],
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
