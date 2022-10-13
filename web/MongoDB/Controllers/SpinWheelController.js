
import { catchErrors } from '../MiddleWare/catchErrors.js';
import spinWheelSchema from '../Schema/spinWheelSchema.js'

export const getSpinCounters = catchErrors(async (req, res, next) => {

    try {
        const data = await spinWheelSchema.find();
        res.status(200).json({ success: true, data })

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error })
    }
})

export const createSpinCounters = catchErrors( async (req, res) => {
        try {
            const { openedSpinwheel, closedSpinwheel, spinned } = req.body;
            const counter = await spinWheelSchema.create({ openedSpinwheel, closedSpinwheel, spinned });
            res.status(200).json({ success: true, counter })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error })
    
        }
    }
) 
export const updateSpinCounters = catchErrors( async (req, res) => {
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