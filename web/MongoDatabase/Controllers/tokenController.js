import { catchErrors } from "../MiddleWare/catchErrors.js";
import tokenSchema from '../Schema/tokenSchema.js'

export const getAccessToken =  catchErrors(async (req, res) => {
const getToken = await tokenSchema.findOne();
res.status(200).json({ success: true, getToken});
})

export const saveTokenToDB = async(session) => {
    console.log("saving token to db");
    const getToken = await tokenSchema.findOne();
    if(!getToken){
  
      const tok = await tokenSchema.create({accessToken:session.accessToken});
      console.log("Created tok :-->", tok);
    }
    if (getToken?.accessToken !==session.accessToken) {
      const updateToken = await tokenSchema.findOneAndUpdate(getToken?._id, { accessToken:session.accessToken }, {
        new: true,
        runValidators: false,
        useFindAndModify: false
    })
    console.log("Updated tok :-->", updateToken);
    }
    console.log("getToken: -->" , getToken?.accessToken);
}