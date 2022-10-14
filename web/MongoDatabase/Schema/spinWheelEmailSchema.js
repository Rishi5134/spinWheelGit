import mongoose from "mongoose";
import validator from "validator";

const EmailSchema = new mongoose.Schema({
    totalEmails: [{
    
            type: String,
            unique: true,
            required: true,
            validate: [validator.isEmail, "Enter a valid email"]
        
    }]  

})

export default mongoose.model("Spinned Email", EmailSchema);