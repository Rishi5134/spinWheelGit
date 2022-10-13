import EmailSchema from "../Schema/spinWheelEmailSchema.js";
import {catchErrors} from '../MiddleWare/catchErrors.js';

export const createEmails = catchErrors(async (req, res, next) => {
    try {

        const {totalEmails} = req.body;
        const emailCreated = await EmailSchema.create(req.body)
        res.status(200).json({success: true, emailCreated})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error})
    }

})
export const EmailsListUpdate = catchErrors(async (req, res, next) => {

    try {
        const emails = await EmailSchema.findById(req.params.id)
        emails.totalEmails.push(req.body.totalEmails.toString());
        await emails.save();

        res.status(200).json({success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error})

    }

})
export const getEmailsList = catchErrors(async (req, res, next) => {

    try {
        const emails = await EmailSchema.find()

        res.status(200).json({success: true, emails})
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error})

    }

})
export const findEmail = catchErrors(async (req, res, next) => {
        try {
                const email = req.query.email;
                console.log(email);
                const found = await EmailSchema.findOne({totalEmails:email})
                res.status(200).json({success: true, found})
        } catch (error) {
                console.log(error);
                res.status(500).json({success: false, error})
        }
})