const fastcsv = require('fast-csv');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Organization = require('../models/Organization');

// Add Dummy Data
module.exports.addMockData = async () => {
    try{
        await User.bulkCreate([
            {
                s_id: 200123008,
                // f_name: 'Ankush',
                // l_name: 'Patanwal',
                name: 'Ankush Patanwal',
                branch: 'MnC'
            },
            {
                s_id: 190101090,
                // f_name: 'Swapnil',
                // l_name: 'Srivastava',
                name: 'Swapnil Srivastava',
                branch: 'CSE'
            }
        ]);

        await Organization.create({
            name: 'Coding Club',
            head_id: 190101090
        });

        await Admin.create({
            s_id: 190101090,
            org_id: 100
        });
        console.log("Mock data added successfully.");
    }
    catch(err){
        console.log(err);
    }
};

// Add all users to DB from csv
module.exports.addAllUsers = (file) => {
    try{
        let stream = fs.createReadStream(file);
        let csvData = [];
        let csvStream = fastcsv
            .parse()
            .on('data', (data) => {
                if (data[2].match(/^\d{9}$/)) {
                    csvData.push(data);
                }
            })
            .on('end', () => {
                csvData.shift();
                csvData.forEach(async (data) => {
                    try {
                        await User.create({
                            s_id: data[2],
                            name: data[1],
                            mail: data[3],
                            branch: data[8],
                            program: data[7]
                        })
                    } catch (err) {
                        console.log(err);
                    }
                });
            });
        stream.pipe(csvStream);
    }
    catch(err){
        console.log(err);
    }
};