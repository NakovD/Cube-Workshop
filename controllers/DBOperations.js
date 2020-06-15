const Accessory = require('../models/accessory.js');
const Cube = require('../models/cube.js');

//find all accessories that a cube does NOT have;
const freeAccessoriesFunc = async (cubeId) => {
    const freeAccessories = await Accessory.find({ cubes: { $nin: cubeId } }).lean();

    return freeAccessories;
}

const updateCubeAndAccessory = async (cubeID, accessoryID) => {
    try {
        const cubeUpdate = await Cube.findByIdAndUpdate(cubeID, {
            $addToSet: { accessories: [accessoryID] }
        });
        const accessoryUpdate = await Accessory.findByIdAndUpdate(accessoryID, {
            $addToSet: { cubes: [cubeID] }
        });

    } catch (error) {
        console.log(error);
    }
}

//searchFunction for main Page;
const search = async (_name, _min, _max) => {
    const name = _name;
    const min = +_min || 1;
    const max = +_max || 100;
    const allCubes = await Cube.find({ name: { $regex: name, $options: 'i' }, diffLvl: { $gte: min, $lte: max } }).lean();
    return allCubes;
}

const cubeDiffText = (cubeDiff) => {
    const difficulties = {
        1: 'Very Easy',
        2: 'Easy',
        3: 'Medium(Standard 3x3)',
        4: 'Intermidiate',
        5: 'Expert',
        6: 'Hardcode'
    }
    const currentCubeDiff = difficulties[cubeDiff];
    return currentCubeDiff;
}


module.exports = {
    freeAccessoriesFunc,
    updateCubeAndAccessory,
    search,
    cubeDiffText
};