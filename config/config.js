module.exports = {
    development: {
        port: process.env.PORT || 3000,
        password: `mongodb+srv://nakovD:${process.env.NODE_PASS}@mongodbexercise-uptx5.mongodb.net/MongoDBExercise?retryWrites=true&w=majority`
    },
    production: {}
};