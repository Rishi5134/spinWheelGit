// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import cookieParser from "cookie-parser";
import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import mongoDatabase from "./MongoDatabase/Connection/connectDB.js";
import applyAuthMiddleware from "./middleware/auth.js";
import verifyRequest from "./middleware/verify-request.js";
import { setupGDPRWebHooks } from "./gdpr.js";
import productCreator from "./helpers/product-creator.js";
import redirectToAuth from "./helpers/redirect-to-auth.js";
import { BillingInterval } from "./helpers/ensure-billing.js";
import { AppInstallations } from "./app_installations.js";
import axios from 'axios'
import { createSpinCountersAndDiscountCode, getAllDiscountCodes, getSpinCountersAndDiscountCode, singleSpinCounter, updateDiscountCode, updateSpinCountersAndDiscountCode } from "./MongoDatabase/Controllers/SpinWheelController.js";
import spinWheelSchema from "./MongoDatabase/Schema/spinWheelSchema.js";
const SpinWheel = import('./MongoDatabase/Schema/spinWheelSchema.js');
import bodyParser from "body-parser";
import cors from "cors";
import { createEmails, EmailsListUpdate, findEmail, getEmailsList } from "./MongoDatabase/Controllers/SpinWheelEmailsController.js";
import { getAccessToken, saveTokenToDB } from "./MongoDatabase/Controllers/tokenController.js";
import tokenSchema from "./MongoDatabase/Schema/tokenSchema.js";


const USE_ONLINE_TOKENS = false;

const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

// TODO: There should be provided by env vars
const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

const DB_PATH = `${process.cwd()}/database.sqlite`;

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES.split(","),
  HOST_NAME: process.env.HOST.replace(/https?:\/\//, ""),
  HOST_SCHEME: process.env.HOST.split("://")[0],
  API_VERSION: LATEST_API_VERSION,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  SESSION_STORAGE: new Shopify.Session.SQLiteSessionStorage(DB_PATH),
});

Shopify.Webhooks.Registry.addHandler("APP_UNINSTALLED", {
  path: "/api/webhooks",
  webhookHandler: async (_topic, shop, _body) => {
    await AppInstallations.delete(shop);
  },
});

// The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
// See the ensureBilling helper to learn more about billing in this template.
const BILLING_SETTINGS = {
  required: false,
  // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
  // chargeName: "My Shopify One-Time Charge",
  // amount: 5.0,
  // currencyCode: "USD",
  // interval: BillingInterval.OneTime,
};

// This sets up the mandatory GDPR webhooks. You’ll need to fill in the endpoint
// in the “GDPR mandatory webhooks” section in the “App setup” tab, and customize
// the code when you store customer data.
//
// More details can be found on shopify.dev:
// https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks
setupGDPRWebHooks("/api/webhooks");

// export for test use only
export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  billingSettings = BILLING_SETTINGS
) {
  const app = express();

  app.set("use-online-tokens", USE_ONLINE_TOKENS);
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));
  app.use(express.json())
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(cors)
  app.use(express.urlencoded({ extended: false }));
  applyAuthMiddleware(app, {
    billing: billingSettings,
  });

  // Do not call app.use(express.json()) before processing webhooks with
  // Shopify.Webhooks.Registry.process().
  // See https://github.com/Shopify/shopify-api-node/blob/main/docs/usage/webhooks.md#note-regarding-use-of-body-parsers
  // for more details.

  mongoDatabase();

  // counters
  app.get('/api/spincounters', getSpinCountersAndDiscountCode)
  app.post('/api/spincounters/create', createSpinCountersAndDiscountCode)
  app.put('/api/spincounters/update/:id', updateSpinCountersAndDiscountCode)
  app.get('/api/spincounter/:id', singleSpinCounter)
  

  // spin Emails 
  app.post('/api/spinemail/create', createEmails);
  app.put('/api/spinemail/update/:id', EmailsListUpdate);
  app.get('/api/spinemails', getEmailsList);
  app.get('/api/spinemail/one', findEmail);
  app.get('/api/token', getAccessToken);

  // discountCodes
  app.put('/api/update/discount/:id', updateDiscountCode);
  app.get('/api/discountcodes', getAllDiscountCodes);

  app.post("/api/price-rule", async (req, res) => {

    var getToken = await tokenSchema.findOne();
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
      );
  

    const { PriceRule } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`);

    try {
      const price_rule = new PriceRule({ session: getToken });
      const { title, target_type, target_selection, allocation_method, value_type, value, customer_selection, starts_at } = req.body
      price_rule.title = title;
      price_rule.target_type = target_type;
      price_rule.target_selection = target_selection;
      price_rule.allocation_method = allocation_method;
      price_rule.value_type = value_type;
      price_rule.value = value;
      price_rule.customer_selection = customer_selection;
      price_rule.starts_at = starts_at;
      const priceRule = await price_rule.save({
        update: true,
      });
      res.status(200).json({ success: true, priceRule })
      console.log("priceRule", priceRule);
    } catch (e) {
      console.log(`Error`, e);
      res.status(500).json({ error: e });
    }
  });

  app.get('/api/allpricerules', async (req, res) => {


      var getToken = await tokenSchema.findOne();
    
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );

// console.log("sessiondsf", session);

    const { PriceRule } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`);

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
  })

  app.post("/api/discount-code/create", async (req, res) => {

    var getToken = await tokenSchema.findOne();


    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );


    const { DiscountCode } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`);
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
  })
  app.post("/api/webhooks", async (req, res) => {
    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (e) {
      console.log(`Failed to process webhook: ${e.message}`);
      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });


  // All endpoints after this point will require an active session
  app.use(
    "/api/*",
    verifyRequest(app, {
      billing: billingSettings,
    })
  );

  app.get("/api/products/count", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    console.log("session: " + session);
    const { Product } = await import(
      `@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`
    );

    const countData = await Product.count({ session });
    res.status(200).send(countData);
  });



  app.get("/api/products/count", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, app.get("use-online-tokens"));
    const { Product } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION
      }/index.js`);

    const countData = await Product.count({ session });
    res.status(200).send(countData);
  });







  app.post('/api/orders', async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(req, res, app.get("use-online-tokens"));
    console.log("Session :-->", session);
    // res.redirect(`api/token/${session.accessToken}`);
    // tok(session);
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
    // const discountCodeQuery = discountCodes[0].discountCode

    // console.log("discountCodeQuery :-->",discountCodeQuery)
    try {

      console.log('flag1');
      const { Order } = await import(`@shopify/shopify-api/dist/rest-resources/${Shopify.Context.API_VERSION}/index.js`)
      const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
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
        "numProds": 7,
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
  })

  app.get("/api/products/create", async (req, res) => {
    const session = await Shopify.Utils.loadCurrentSession(
      req,
      res,
      app.get("use-online-tokens")
    );
    let status = 200;
    let error = null;

    try {
      await productCreator(session);
    } catch (e) {
      console.log(`Failed to process products/create: ${e.message}`);
      status = 500;
      error = e.message;
    }
    res.status(status).send({ success: status === 200, error });
  });

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json());

  app.use((req, res, next) => {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    if (Shopify.Context.IS_EMBEDDED_APP && shop) {
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${encodeURIComponent(
          shop
        )} https://admin.shopify.com;`
      );
    } else {
      res.setHeader("Content-Security-Policy", `frame-ancestors 'none';`);
    }
    next();
  });

  if (isProd) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH, { index: false }));
  }

  app.use("/*", async (req, res, next) => {
    if (typeof req.query.shop !== "string") {
      res.status(500);
      return res.send("No shop provided");
    }

    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    const appInstalled = await AppInstallations.includes(shop);

    if (!appInstalled && !req.originalUrl.match(/^\/exitiframe/i)) {
      return redirectToAuth(req, res, app);
    }

    if (Shopify.Context.IS_EMBEDDED_APP && req.query.embedded !== "1") {
      const embeddedUrl = Shopify.Utils.getEmbeddedAppUrl(req);

      return res.redirect(embeddedUrl + req.path);
    }

    const htmlFile = join(
      isProd ? PROD_INDEX_PATH : DEV_INDEX_PATH,
      "index.html"
    );

    return res
      .status(200)
      .set("Content-Type", "text/html")
      .send(readFileSync(htmlFile));
  });

  return { app };
}

createServer().then(({ app }) => app.listen(PORT));
