const mongoose = require('mongoose');

const { DB_CNN } = process.env

const dbConnection = async() => {
    try {
        await mongoose.connect(DB_CNN);
        console.log("DB Online")
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de inicializar BD");
    }
}

module.exports = {
    dbConnection
}