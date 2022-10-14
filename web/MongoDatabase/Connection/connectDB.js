import mongoose from "mongoose";

const DB_URL = 'mongodb+srv://spinwheel:spinwheel@spinwheelcluster.2lbehqn.mongodb.net/?retryWrites=true&w=majority';

const mongoDatabase = () => {
    try {
        mongoose.connect(DB_URL, {
            useUnifiedTopology: true,
            useNewURLParser: true
        }).then((data) => {
            console.log(`MongoDB Connected successfully at :--> ${data.connection.host}`);
        })
    } catch (error) {
        console.log("Database Error: " + error);
    }
}
export default mongoDatabase;