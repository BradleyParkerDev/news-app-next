//Imports Mongoose
const mongoose = require('mongoose');

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set('strictQuery', false);


//Defines Database
const mongoDB = process.env.ATLAS_URI;

//Connects to mongoDb
const mongooseConnect = async () => {
    
    try {
        await mongoose.connect(mongoDB, {dbName:process.env.MONGO_DATABASE})
    } catch (error) {
        throw error;
        
    }
}

module.exports = {
    mongooseConnect
};