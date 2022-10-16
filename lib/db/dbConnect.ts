/* eslint-disable max-len */
import mongoose from 'mongoose';

// if (!process.env.NEXT_PUBLIC_MONGODB_URI) {
//     throw new Error('Please add your MONGODB_URI to .env.local');
// }

// const MONGODB_URI: string = process.env.NEXT_PUBLIC_MONGODB_URI;

const MONGODB_URI =
    'mongodb+srv://vercel-admin-user:9I3rRonPu1jbybL6@cluster0.hxhkhh8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const globalWithMongoose = global as typeof globalThis & {
    mongoose: any;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
    cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            return mongoose;
        });
    }
    cached.conn = await cached.promise;
    return cached.conn;
}

export { dbConnect };
