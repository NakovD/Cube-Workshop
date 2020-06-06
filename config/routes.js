const homePageController = require('../controllers/mainPage.js');
const createCubeController = require('../controllers/createCube.js');
const detailsController = require('../controllers/details.js');
const aboutController = require('../controllers/about.js');
const errorPageController = require('../controllers/error.js');
const createAccesoryController = require('../controllers/createAccesory.js');

module.exports = (app) => {
    app.use('/', homePageController);

    app.use('/create', createCubeController);

    app.use('/details/', detailsController);

    app.use('/about', aboutController);

    app.use('/create/accessory', createAccesoryController);

    app.use('*', errorPageController);
};