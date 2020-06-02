const fs = require('fs');
const path = require('path');
const pathDB = path.join(__dirname, '../config/database.json');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const readDB = async () => {
    try {
        const allData = await readFile(pathDB);
        return JSON.parse(allData);
    } catch (error) {
        throw(error);
    }
}

const writeInDB = async (data) => {
    try {
        fs.writeFile(pathDB,JSON.stringify(data),() => console.log('File successfully updated!'));
    } catch (error) {
        throw(error);
    }
}

module.exports = {
    readDB,
    writeInDB
}