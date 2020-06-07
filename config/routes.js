const homePageController = require('../controllers/mainPage.js');
const createCubeController = require('../controllers/createCube.js');
const detailsController = require('../controllers/details.js');
const aboutController = require('../controllers/about.js');
const errorPageController = require('../controllers/error.js');
const createAccesoryController = require('../controllers/createAccesory.js');
const attachAccessoryController = require('../controllers/attachAccessory.js');

module.exports = (app) => {
    app.use('/', homePageController);

    app.use('/create', createCubeController);

    app.use('/details/', detailsController);

    app.use('/about', aboutController);

    app.use('/create/accessory', createAccesoryController);

    app.use('/attach/accessory/', attachAccessoryController);

    app.use('*', errorPageController);
};