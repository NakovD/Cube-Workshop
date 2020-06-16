const homePageController = require('../routes/mainPage.js');
const cubeOperationsControler = require('../routes/cube.js');
const otherController = require('../routes/other.js');
const accesoryOperationsController = require('../routes/accessory.js');
const authController = require('../routes/auth.js');

module.exports = (app) => {
    app.use('/', homePageController);

    app.use('/', cubeOperationsControler);

    app.use('/', otherController);

    app.use('/', accesoryOperationsController);

    app.use('/', authController);

    app.use('*', otherController);
};