const { v4 } = require('uuid');
const { readDB } = require('./dbOperations.js');
const { writeInDB } = require('./dbOperations.js');

class Cube {
    constructor(name, description, imageURL, diffLvl) {
        this.id = v4();
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.diffLvl = diffLvl;
    }
    async save() {
        const currentCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageURL: this.imageURL,
            diffLvl: this.diffLvl
        }
        const allCubes = await readDB();
        allCubes.push(currentCube);
        writeInDB(allCubes);
    }
}

module.exports = Cube;