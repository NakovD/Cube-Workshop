const fs = require('fs');
const path = require('path');
const pathDB = path.join(__dirname, '../config/database.json');

const getAllCubes =  () => {
    fs.readFile(pathDB, (err,data) => {
        if (err) {
            throw(err);
        }
        const allCubes = JSON.parse(data);
        
    });
}
// console.log(getAllCubes());


module.exports = getAllCubes;