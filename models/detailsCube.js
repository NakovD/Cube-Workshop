const { readDB } = require('./dbOperations.js');

const getCubeInfo = async (id) => {
    const allCubes = await readDB();
    const neededCube = allCubes.find(el => el.id === id);
    return neededCube;
}

module.exports = getCubeInfo;