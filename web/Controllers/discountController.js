import Shopify from "@shopify/shopify-api";
import tokenSchema from "../MongoDatabase/Schema/tokenSchema.js";

//creates new pricerule object
export const setPriceRule = async (req, res, session, PriceRule) => {
console.log("Hello!");
    var getToken = await tokenSchema.findOne();
    

    try {
        const price_rule = new PriceRule({ session: getToken });
        const {
            title,
            target_type,
            target_selection,
            allocation_method,
            value_type,
            value,
            customer_selection,
            starts_at
        } = req.body
        price_rule.title = title;
        price_rule.target_type = target_type;
        price_rule.target_selection = target_selection;
        price_rule.allocation_method = allocation_method;
        price_rule.value_type = value_type;
        price_rule.value = value;
        price_rule.customer_selection = customer_selection;
        price_rule.starts_at = starts_at;
        const priceRule = await price_rule.save({ update: true });
        res.status(200).json({ success: true, priceRule })
        console.log("priceRule", priceRule);
    } catch (e) {
        console.log(`Error`, e);
        res.status(500).json({ error: e });
    }
}

//fetches all pricerule objects
export const getAllPriceRules = async (req, res, session,PriceRule ) => {
    var getToken = await tokenSchema.findOne();
    
    try {
        const allPriceRule = await PriceRule.all({
            session: getToken,
        });
        res.status(200).json({ success: true, allPriceRule })
        // console.log("allPriceRule", allPriceRule);
    } catch (error) {
        res.status(200).json({ success: false, error })
        console.log(error);
        
        console.log(error);
    }
}

// generates new discountCode
export const createDiscountCode = async (req, res, session,DiscountCode ) => {
    var getToken = await tokenSchema.findOne();
    const { code, priceRuleID } = req.body
    try {
      const discount_code = new DiscountCode({ session: getToken });
      discount_code.price_rule_id = priceRuleID;
      discount_code.code = code;
      const discount = await discount_code.save({
        update: true,
      });
      console.log("discount", discount);
      res.status(200).json({ success: true, message: "Discount Code created successfully", discount })
    } catch (error) {
      res.status(200).json({ success: false, error })
      console.log("Errroor", error);
    }
}
