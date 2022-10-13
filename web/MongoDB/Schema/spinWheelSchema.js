import mongoose from "mongoose";

const spinWheelSchema = new mongoose.Schema({
    openedSpinwheel :{
        type: Number,
        required: true,
        
    },
    closedSpinwheel :{
        type: Number,
        required: true,

    },
    spinned :{
        type: Number,
        required: true,

    }
})

export default mongoose.model("Spin Counters", spinWheelSchema);