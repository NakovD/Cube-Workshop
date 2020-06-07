const Cube = require('../models/cube.js');

const search = async (_name, _min, _max) => {
    const name = _name;
    const min = +_min || 1;
    const max = +_max || 100;
    const allCubes = await Cube.find({ name: { $regex: name, $options: 'i' }, diffLvl: { $gte: min, $lte: max } }).lean();
    return allCubes;
}

module.exports = search;