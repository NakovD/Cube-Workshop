const { v4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const pathDB = path.join(__dirname, '../config/database.json');
class Cube {
    constructor(name, description, imageURL, diffLvl) {
        this.id = v4();
        this.name = name;
        this.description = description;
        this.imageURL = imageURL;
        this.diffLvl = diffLvl;
    }
    save() {
        const currentCube = {
            id: this.id,
            name: this.name,
            description: this.description,
            imageURL: this.imageURL,
            diffLvl: this.diffLvl
        }
        fs.readFile(pathDB, (err, cubesDB) => {
            if (err) {
                throw (err);
            }
            const allCubes = JSON.parse(cubesDB);
            allCubes.push(currentCube);

            fs.writeFile(pathDB, JSON.stringify(allCubes), () => console.log('Cube successfully created!'));
        });

    }
}

module.exports = {
    Cube,
    pathDB
};