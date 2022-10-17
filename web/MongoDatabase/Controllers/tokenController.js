import { catchErrors } from "../MiddleWare/catchErrors.js";
import tokenSchema from '../Schema/tokenSchema.js'

export const getAccessToken = async (req, res) => {
  try {
    const getToken = await tokenSchema.findOne();
    res.status(200).json({ success: true, getToken });
    
  } catch (error) {
    console.log("Error getting access token: " + error);
  }
}


export const saveTokenToDB = async (session) => {
  console.log("saving token to db", session);
  const getToken = await tokenSchema.findOne();
  if (!getToken) {
    console.log("flag1");


    const tok = await tokenSchema.create({ accessToken: session.accessToken, shop: session.shop, id: session.id, state: session.state, isOnline: session.isOnline, scope: session.scope });
    console.log("Created tok :-->", tok);
  }
  if (getToken?.accessToken !== session.accessToken || getToken.shop !== session.shop) {
    const updateToken = await tokenSchema.findOneAndUpdate(getToken?._id, { accessToken: session.accessToken, shop: session.shop }, {
      new: true,
      runValidators: false,
      useFindAndModify: false
    })
    console.log("Updated tok :-->", updateToken);
  }
  console.log("getToken: -->", getToken?.accessToken);
}