import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
 
            id:{

                type: String,
                required: true,
            },
            shop:{
                type: String,
                required: true,

            },
            state:{
                type: String,
                required: true,
            },
            isOnline:{
                type: String,
                required: true,
            },
            scope:{
                type: String,
                required: true,
            },
            accessToken:{
                type: String,
                required: true,
            },
            
    
    
})

export default mongoose.model("Access Token", tokenSchema);