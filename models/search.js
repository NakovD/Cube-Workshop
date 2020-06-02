const { readDB } = require('./dbOperations.js');

const search = async (_name, _min, _max) => {
    const allCubes = await readDB();
    const name = _name;
    const min = +_min || 1;
    const max = +_max || 100;
    const matchedNames = allCubes.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
    const matchedMinDiff = matchedNames.filter(el => +el.diffLvl >= +min);
    const matchedMaxDiff = matchedMinDiff.filter(el => +el.diffLvl <= +max);
    return matchedMaxDiff;

}

module.exports = search;