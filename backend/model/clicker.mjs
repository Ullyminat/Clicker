import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    click: {
        type: Number,
        default: 0
    },
    autoclicker: {
        type: Number,
        default: 0
    }
});
export const Click = mongoose.model('Click',clickSchema)