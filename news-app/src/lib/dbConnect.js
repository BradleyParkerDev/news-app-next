const mongoose = require("mongoose");

// Define constants for MongoDB URI and Database Name
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DATABASE_NAME = process.env.MONGODB_DATABASE_NAME; 

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

if (!MONGODB_DATABASE_NAME) {
    throw new Error(
        "Please define the MONGODB_DATABASE_NAME environment variable inside .env.local"
    );
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
            dbName: MONGODB_DATABASE_NAME  // Include the database name in the connection options
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Reset promise so it can try again next time
        throw e;
    }

    return cached.conn;
}

module.exports = dbConnect;
