const homePageController = require('../routes/mainPage.js');
const createCubeController = require('../routes/cube.js');
const detailsController = require('../routes/cube.js');
const aboutController = require('../routes/other.js');
const errorPageController = require('../routes/other.js');
const createAccesoryController = require('../routes/accessory.js');
const attachAccessoryController = require('../routes/accessory.js');

module.exports = (app) => {
    app.use('/', homePageController);

    app.use('/', createCubeController);

    app.use('/', detailsController);

    app.use('/', aboutController);

    app.use('/', createAccesoryController);

    app.use('/', attachAccessoryController);

    app.use('*', errorPageController);
};