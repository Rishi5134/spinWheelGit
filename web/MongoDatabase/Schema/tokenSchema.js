import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    accessToken :{
        type: String,
        required: true,
        
    },
    
})

export default mongoose.model("Access Token", tokenSchema);