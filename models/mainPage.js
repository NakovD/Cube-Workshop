const { readDB } = require('./dbOperations.js');
const getAllCubes = async () => {
    const allCubes = await readDB();
    return allCubes;
}

module.exports = getAllCubes;