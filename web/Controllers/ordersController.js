import { saveTokenToDB } from "../MongoDatabase/Controllers/tokenController.js";
import spinWheelSchema from "../MongoDatabase/Schema/spinWheelSchema.js";

//returns all orders that are placed using the discountcodes generated by spin wheel app
export const getDiscountOrders = async(req, res, session, Order, client) => {

    saveTokenToDB(session)
    var finalQuery = []
    const discountCodes = await spinWheelSchema.find().select({ discountCode: 1 })

    console.log("discountCodes :-->", discountCodes[0].discountCode);
    const lastElement = discountCodes[0].discountCode.length - 1
    const lastElementQuery = "discount_code:" + discountCodes[0].discountCode[discountCodes[0].discountCode.length - 1]
    for (let index = 0; index < lastElement; index++) {
      const element = discountCodes[0].discountCode[index];

      const result = finalQuery.push("discount_code:" + element + " OR ")
      console.log("element:", result);

      console.log("finalQuery :-->", finalQuery);
    }
    finalQuery.push(lastElementQuery);

    try {

      console.log('flag1');
      const { reverseValue, searchCategory, forwardCursor, backwardCursor, firstNumProd, lastNumProd } = req.body
      const resultQuery = finalQuery.toString().replaceAll(',', '')
      console.log('flag2', resultQuery);
      const OrdersCount = await Order.count({
        session: session,
        status: "any",
      });
      console.log("ordersCount", OrdersCount);
      console.log('flag3');
      const variables = {
        "numProds": 8,
        "ForwardCursor": forwardCursor,
        "BackwardCursor": backwardCursor
      }

      console.log("finalQuery", finalQuery.toString().replaceAll(',', ''));
      const data = await client.query({
        data: {
          query: `query ($numProds: Int!, $ForwardCursor: String, $BackwardCursor: String) {
                    orders(reverse:${reverseValue}, first: ${firstNumProd}, after: $ForwardCursor, last: ${lastNumProd}, before: $BackwardCursor, query: "${resultQuery}") {
                      edges {
                        cursor
                        node {
                          currencyCode
                          id
                          totalPrice
                          name
                          email
                          discountCode
                          lineItems(first: 10) {
                            nodes {
                              name
                              title
                              variantTitle
                              id
                            }
                          }
                        }
                      }
                      pageInfo {
                        startCursor
                        hasNextPage
                        hasPreviousPage
                        endCursor
                      }
                    }
                  }
                  `,

          variables: variables
        }

      });
      console.log('flag4');
      res.status(200).json({ data, OrdersCount, success: true, finalQuery });

      console.log('flag5');
    } catch (error) {
      console.log('flag6');
      console.log("Error" + error);
      res.status(200).json({ error, success: false });
    }
}