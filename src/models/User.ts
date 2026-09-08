import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
      default: Date.now
    }
})

const User = mongoose.model('User', userSchema)

export default User