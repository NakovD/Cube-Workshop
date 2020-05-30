const fs = require('fs');
const path = require('path');
const pathDB = path.join(__dirname, '../config/database.json');

const getAllCubes = () => {
    const allCubes = fs.readFileSync(pathDB);
    return JSON.parse(allCubes);
}

module.exports = getAllCubes;