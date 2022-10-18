
import { catchErrors } from '../MiddleWare/catchErrors.js';
import spinWheelSchema from '../Schema/spinWheelSchema.js'

export const getSpinCountersAndDiscountCode = catchErrors(async (req, res, next) => {

    try {
        const data = await spinWheelSchema.find();
        res.status(200).json({ success: true, data })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error })
    }
})

export const createSpinCountersAndDiscountCode = catchErrors( async (req, res) => {
        try {

            
            const { openedSpinwheel, closedSpinwheel, spinned, discountCode } = req.body;
            const counter = await spinWheelSchema.create({ openedSpinwheel, closedSpinwheel, spinned, discountCode });
            res.status(200).json({ success: true, counter })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
    
        }
    }
) 
export const updateSpinCountersAndDiscountCode = catchErrors( async (req, res) => {
        try {
            const id = req.params.id
            const { openedSpinwheel, closedSpinwheel, spinned } = req.body;
            const counterUpdate = await spinWheelSchema.findByIdAndUpdate(id, { openedSpinwheel, closedSpinwheel, spinned }, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });
            res.status(200).json({ success: true, counterUpdate })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
    
        }
    }
) 
export const singleSpinCounter = catchErrors( async (req, res) => {
        try {
            const id = req.params.id

            const counter = await spinWheelSchema.findById(id)
            res.status(200).json({ success: true, counter })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
    
        }
    }
) 

export const updateDiscountCode = catchErrors( async (req, res) => {
    try {
        const id = req.params.id
        const { discountCode } = req.body;
        console.log("req.body", req.body);
        console.log("Discount Code: " + discountCode);
        let retriveDiscountCode = await spinWheelSchema.findOne().select({discountCode : 1, _id: 0})
        console.log("retriveDiscountCode:", retriveDiscountCode.discountCode);
        const newArrayOfDiscount = retriveDiscountCode.discountCode.push(`${discountCode}`);
        const newArrayOfDiscountCode = retriveDiscountCode.discountCode
        console.log("retriveDiscountCode:",newArrayOfDiscountCode );
        const discountUpdate = await spinWheelSchema.findByIdAndUpdate(id, { discountCode:newArrayOfDiscountCode }, {
            new: true,
            runValidators: false,
            useFindAndModify: false
        });
        res.status(200).json({ success: true, discountUpdate })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error })

    }
}
) 

export const getAllDiscountCodes = catchErrors(async (req,res) => {
    const discountCodes = await spinWheelSchema.find().select({discountCode:1})
    res.status(200).json({ success: true, discountCodes })
})