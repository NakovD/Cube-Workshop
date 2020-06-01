const fs = require('fs');
const { pathDB } = require('./cube.js');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const getCubeInfo = async (id) => {
    const allCube = await readFile(pathDB, (err, data) => {
        if (err) {
            throw (err);
        }
        return JSON.parse(data);
    });
    const neededCube = JSON.parse(allCube).find(el => el.id === id);
    return neededCube;
}

module.exports = getCubeInfo;