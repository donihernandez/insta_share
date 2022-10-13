import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        required: true,
        type: String,
        unique: true,
    },
    files: {
        required: false,
        type: Array,
    },
    hashedPassword: {
        minlength: 5,
        required: true,
        type: String,
    },
    username: {
        required: true,
        type: String,
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
