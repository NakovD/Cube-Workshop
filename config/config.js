module.exports = {
    development: {
        port: process.env.PORT,
        privateKey: process.env.PRIVATE_KEY,
        password: process.env.DB_URL
    },
    production: {}
};