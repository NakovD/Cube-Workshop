const fs = require('fs');
const { pathDB } = require('./cube.js');
const util = require('util');

const readFile = util.promisify(fs.readFile);


const getAllCubes = async () => {
    const allCubes = await readFile(pathDB);
    // debugger;
    return JSON.parse(allCubes);
}

module.exports = getAllCubes;