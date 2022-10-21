$(document).ready(function () {

    checkCookie();
});
var spinWheelDOCId;
var script2 = document.createElement('link');
script2.rel = 'stylesheet';
script2.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
document.getElementsByTagName('head')[0].appendChild(script2);

getSpinnedCounter();

//d3.js code starts here
var padding;
var container;
var KWidth = window.matchMedia("(min-width: 2251px)")
var LaptopLWidth = window.matchMedia("(min-width: 901px)").matches && window.matchMedia("(max-width: 2250px)").matches
var TabletWidth = window.matchMedia("(min-width: 500px)").matches && window.matchMedia("(max-width: 900px)").matches
var MobileWidth = window.matchMedia("(max-width: 499px)").matches


function responsivePadding(w0, h0, r1_0, r2_0) {
    padding = { top: 20, right: 40, bottom: 0, left: 0 },
        w = w0 - padding.left - padding.right, //420 
        h = h0 - padding.top - padding.bottom, //480
        //  r = Math.min(w, h)/2, //210
        r = Math.min(r1_0, r2_0) / 2, //210
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();
}
if (KWidth.matches) {
    responsivePadding(1040, 1040, 800, 2000)
}
if (LaptopLWidth) {
    responsivePadding(500, 500, 450, 2000)
}
if (TabletWidth) {
    responsivePadding(500, 500, 325, 2000)
}
if (MobileWidth) {
    responsivePadding(250, 500, 225, 2000)
}

function responsiveContainer(v1, v2) {
    container = svg.append("g")
        .attr("class", "submitSpin")
        .attr("transform", "translate(" + (v1) + "," + (v2) + ")")
}
// if (KWidth) {

//  padding = {top:20, right:40, bottom:0, left:0},
//  w = 1040 - padding.left - padding.right, //420
//  h = 1040 - padding.top  - padding.bottom, //480
// //  r = Math.min(w, h)/2, //210
//  r = Math.min(1000, 2000)/2, //210
//  rotation = 0,
//  oldrotation = 0,
//  picked = 100000,
//  oldpick = [],
//  color = d3.scale.category20();
// }
if (matchMedia("(max-width: 240px)").matches) {


    padding = { top: 20, right: 40, bottom: 0, left: 0 },
        w = 500 - padding.left - padding.right, //420
        h = 500 - padding.top - padding.bottom, //480
        r = Math.min(w, h) / 2, //210
        // r = Math.min(360,500)/2, //210
        rotation = 0,
        oldrotation = 0,
        picked = 100000,
        oldpick = [],
        color = d3.scale.category20();
}

//  padding = {top:20, right:40, bottom:0, left:0},
//             w = 500 - padding.left - padding.right, //420
//             h = 500 - padding.top  - padding.bottom, //480
//             r = Math.min(w, h)/2, //210
//             // r = Math.min(360,500)/2, //210
//             rotation = 0,
//             oldrotation = 0,
//             picked = 100000,
//             oldpick = [],
//             color = d3.scale.category20();

var data = [
    { "label": "RS 20", "value": 20, "offerText": "RS 20 OFF", "offerCode": "EU00FN" },
    { "label": "RS 10", "value": 40, "offerText": "RS 40 OFF", "offerCode": "GR40QE" },
    { "label": "RS 5", "value": 5, "offerText": "RS 5 OFF", "offerCode": "OP5RE" },
    { "label": "RS 30", "value": 30, "offerText": "RS 30 OFF", "offerCode": "YJ30BR" },
    { "label": "RS 50", "value": 50, "offerText": "RS 50 OFF", "offerCode": "OP50RE" },
    { "label": "RS 1", "value": 01, "offerText": "RS 1 OFF", "offerCode": "AE01MO" },
    { "label": "RS 0", "value": 05, "offerText": "RS 05 OFF", "offerCode": "EU00FN" },
    { "label": "RS 10", "value": 60, "offerText": "RS 60 OFF", "offerCode": "AE60MO" },
];
if (MobileWidth) {
    var svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", 350)
} else {

    var svg = d3.select('#chart')
        .append("svg")
        .data([data])
        .attr("width", w + padding.left + padding.right)
        .attr("height", h + padding.top + padding.bottom)
}
if (KWidth.matches) {
    responsiveContainer(500, 500)
}
if (LaptopLWidth) {

    responsiveContainer(250, 250)
}
if (TabletWidth || MobileWidth) {

    responsiveContainer(250, 250)
}
if (MobileWidth) {

    responsiveContainer(120, 200)
}
// if (LaptopLWidth) {

// }
// if (KWidth) {
//     container = svg.append("g")
//     .attr("class", "submitSpin")
//     .attr("transform", "translate(" + (500) + "," + (500) + ")")
// }

// var container = svg.append("g")
//     .attr("class", "submitSpin")
//     .attr("transform", "translate(" + (260) + "," + (h/2 + padding.top) + ")")
var vis = container
    .append("g");

var pie = d3.layout.pie().sort(null).value(function (d) { return 1; });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis.selectAll("g.slice")
    .data(pie)
    .enter()
    .append("g")
    .attr("class", "slice")

arcs.append("path")
    .attr("fill", function (d, i) { return color(i); })
    .attr("d", function (d) { return arc(d); })
// add the text
arcs.append("text").attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 20) + ")";
})
    .attr("text-anchor", "end")
    .attr('class', 'spinText')
    .text(function (d, i) {
        return data[i].label;
    });
container.on("click", spin);

async function spin(d) {

    var x = document.myform.email.value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address \n atpostion:" + atposition + "\n dotposition:" + dotposition);
        return false;
    } else {

        //  Spin Animation in action
        try {

            if (document.getElementById('spinner-email').value == '') {
                return alert("Enter Email to spin");
            }
            d.preventDefault();
            // addSpinnedEmails();
            const email = document.getElementById('spinner-email').value

            const config = {
                headers: {
                    "ngrok-skip-browser-warning": "false"
                }
            }
            const addEmail = await axios.get(`https://spinwheelapp.herokuapp.com/api/spinemail/one?email=${email}`, config);
            if (addEmail.data.found === null) {
                addSpinnedEmails();



                container.on("click", null);
                //all slices have been seen, all done
                if (oldpick.length == data.length) {
                    container.on("click", null);
                    return;
                }
                // if (oldpick.length > 0) {
                //     container.on("click", null);
                //     alert('Spin completed!!')
                //     return;
                // }
                var ps = 360 / data.length,
                    pieslice = Math.round(1440 / data.length),
                    rng = Math.floor((Math.random() * 1440) + 360);

                rotation = (Math.round(rng / ps) * ps);

                picked = Math.round(data.length - (rotation % 360) / ps);
                picked = picked >= data.length ? (picked % data.length) : picked;
                if (oldpick.indexOf(picked) !== -1) {
                    d3.select(this).call(spin);
                    return;
                } else {
                    oldpick.push(picked);
                }
                rotation += 90 - Math.round(ps / 2);
                vis.transition()
                    .duration(3000)
                    .attrTween("transform", rotTween)
                    .each("end", function () {
                        //mark offerText as seen
                        d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                            .attr("fill", "transparent");
                        //populate offerText
                        d3.select("#offerText h1")
                            .text(data[picked].offerText);
                        // d3.select("#spinnerCode")
                        //     .attr('value', data[picked].offerCode);
                        oldrotation = rotation;
                        getPriceRule(data[picked].offerText, data[picked].value)
                        /* Get the result value from object "data" */

                        /* Comment the below line for restrict spin to sngle time */
                        container.on("click", spin);
                        spinnedSpinCounter();

                    });
            } else {
                alert("Spin Completed!!");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
//make arrow
function spinArrow(t1, t2) {
    svg.append("g")
        .attr("transform", "translate(" + t1 + "," + (t2) + ")")
        .append("path")
        .attr("d", "M-" + (r * .30) + ",0L0," + (r * .10) + "L0,-" + (r * .10) + "Z")
        .style({ "fill": "red" });
}
if (KWidth.matches) {
    spinArrow(900, 500)
}
if (LaptopLWidth) {
    spinArrow(475, 250)
}
if (TabletWidth) {
    spinArrow(412, 250)
}
if (MobileWidth) {
    spinArrow(232, 200)
}
// svg.append("g")
//     .attr("transform", "translate(" + 1000 + "," + (500) + ")")
//     .append("path")
//     .attr("d", "M-" + (r*.30) + ",0L0," + (r*.10) + "L0,-" + (r*.10) + "Z")
//     .style({"fill":"red"});
//draw spin circle
function spinCenterCircle(r) {
    container.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", r)
        .style({ "fill": "white" });
}
if (KWidth.matches || LaptopLWidth) {
    spinCenterCircle(80)
}
if (TabletWidth || MobileWidth) {
    spinCenterCircle(40)
}
// container.append("circle")
//     .attr("cx", 0)
//     .attr("cy", 0)
//     .attr("r", 80)
//     .style({"fill":"white"});

//spin text
function spinText(y0, fs) {
    container.append("text")
        .attr("x", 0)
        .attr("y", y0)
        .attr("text-anchor", "middle")
        .text("SPIN")
        .style({ "font-weight": "bold", "font-size": `${fs}px` });
}
if (MobileWidth) {
    spinText(7, 20)
    0
} else {
    spinText(15, 30)

}
// container.append("text")
//     .attr("x", 0)
//     .attr("y", 15)
//     .attr("text-anchor", "middle")
//     .text("SPIN")
//     .style({"font-weight":"bold", "font-size":"30px"});


function rotTween(to) {
    var i = d3.interpolate(oldrotation % 360, rotation);
    return function (t) {
        return "rotate(" + i(t) + ")";
    };
}

//d3.js code ends here

function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function") {
        window.crypto.getRandomValues(array);
    
    } else {
        //no support for crypto, get crappy random numbers
        for (var i = 0; i < 1000; i++) {
            array[i] = Math.floor(Math.random() * 100000) + 1;
        }
    }
    return array;
}

// toggle spin wheel app
document.getElementById('closeSpin').onclick = function () {
    closeSpinCounter();
    if (document.getElementById('spin_block').style.display == "flex") {
        document.getElementById('mainSpinnner').style.width = "0rem";
        document.getElementById('mainSpinnner').style.height = "0rem";

        document.getElementById('mainSpinnner').style.zIndex = "-1"
        // document.getElementById('spinnWheel').style.zIndex = "0"

        document.getElementById('spin_block').style.display = "none";
 
    }
}
document.getElementById('spinnerImage').onclick = function () {
    openSpinCounter();
    if (document.getElementById('spin_block').style.display == "none") {
        document.getElementById('spin_block').style.display = "flex";

        document.getElementById('mainSpinnner').style.zIndex = "999999";
        // document.getElementById('spinnWheel').style.zIndex = "999999999";
        //    document.getElementById('spin_block').style.flexDirection = "column";
        //    document.getElementById('spin_block').style.justifyContent = "center";
        //    document.getElementById('spin_block').style.alignItems = "center";
        document.getElementById('mainSpinnner').style.width = "100vw";
        document.getElementById('mainSpinnner').style.height = "100%";
        // document.getElementById('MainContent').style.zIndex = "-1"
 
    }
}
const mediaQuery = window.matchMedia('(max-width: 730px)')
// Check if the media query is true
if (mediaQuery.matches) {
    document.getElementById('spin_block').style.flexDirection = "column";
    //    document.getElementById('spin_block').style.justifyContent = "center";
    document.getElementById('spin_block').style.alignItems = "center";

}

// spins the spinWheel
document.getElementById('submitSpin').addEventListener('click', spin);
// document.getElementById('spinnerCode').addEventListener('click', copyText);


// if cookie is not found then this function will execute
function onOpenSpinCounter() {
    document.getElementById('spin_block').style.display = "flex";
    openSpinCounter();
}

if (KWidth.matches) {
    document.getElementsByClassName('spinText').style.fontSize = "4rem";
} else {
    document.getElementsByClassName('spinText').style.fontSize = "2rem";

}

// email validation 
function validateemail() {
    var x = document.myform.email.value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address \n atpostion:" + atposition + "\n dotposition:" + dotposition);
        return false;
    }
}

//  spin wheel cookie generation starts here
function spinwheelCookieGenerator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let spinCookie = getCookie("spinwheel-cookie");
    if (spinCookie != "") {
        document.getElementById('mainSpinnner').style.width = "0rem";
        document.getElementById('mainSpinnner').style.height = "0rem";

        document.getElementById('mainSpinnner').style.zIndex = "-1"
        // document.getElementById('spinnWheel').style.zIndex = "0"

        document.getElementById('spin_block').style.display = "none";
        
    } else {
        setCookie("spinwheel-cookie", spinwheelCookieGenerator(30), 1);
        window.addEventListener('load', (event) => {

        });
        const myTimeout = setTimeout(onOpenSpinCounter, 3000);
    }
}

//  spin wheel cookie generation ends here

// fetches spinned count of spin wheel
async function getSpinnedCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://spinwheelapp.herokuapp.com/api/spincounters`, config2);
    const doc = allCounters.data.data[0];

    if (!doc.spinned) {
        document.getElementById('spinCounter').innerHTML = `Spinned by 0 people`;
    }
    spinWheelDOCId = doc._id;
    document.getElementById('spinCounter').innerHTML = `Spinned by ${doc.spinned} people`;
}


// fetches count of spin wheel opening
async function openSpinCounter() {

    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },

    }
    const allCounters = await axios.get(`https://spinwheelapp.herokuapp.com/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(1, 0, 0);
    }
    const counterValues = {
        "openedSpinwheel": doc.openedSpinwheel + 1,


    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://spinwheelapp.herokuapp.com/api/spincounters/update/${doc._id}`, counterValues, config);
   
}


// fetches count of spin wheel closing
async function closeSpinCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://spinwheelapp.herokuapp.com/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(0, 1, 0);
    }
    const counterValues = {
        "closedSpinwheel": doc.closedSpinwheel + 1,
    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://spinwheelapp.herokuapp.com/api/spincounters/update/${doc._id}`, counterValues, config);

}


// fetches count of spin wheel spin
async function spinnedSpinCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://spinwheelapp.herokuapp.com/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(0, 0, 1);
    }
    const counterValues = {
        "spinned": doc.spinned + 1,
    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://spinwheelapp.herokuapp.com/api/spincounters/update/${doc._id}`, counterValues, config);

}

// if no doc found in mongodb then creates a new one
async function createSpinDoc(a, b, c) {
    const createDoc = {
        "openedSpinwheel": a,
        "closedSpinwheel": b,
        "spinned": c,
        "discountCode": []
    }
    const config3 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(createDoc)
    }
    const createSpinCounterDoc = await axios.post(`https://spinwheelapp.herokuapp.com/api/spincounters/create`, createDoc, config3);
    
}

// saves emails entered into spin wheel app
async function addSpinnedEmails() {
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const newEmail = {
        totalEmails: document.getElementById('spinner-email').value
    }
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false"
        },
        body: JSON.stringify(newEmail)
    }
    const getAllEmails = await axios.get(`https://spinwheelapp.herokuapp.com/api/spinemails`, config);



    const getOneDoc = getAllEmails.data.emails[0]
    if (!getOneDoc) {
        createEmailDoc()
    }
    const addEmail = await axios.put(`https://spinwheelapp.herokuapp.com/api/spinemail/update/${getOneDoc._id}`, newEmail, config2);

}

// if email doc is not found, create new one
async function createEmailDoc() {
    const newEmail = {
        totalEmails: document.getElementById('spinner-email').value
    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false"
        },
        body: JSON.stringify(newEmail)
    }
    const addEmail = await axios.post(`https://spinwheelapp.herokuapp.com/api/spinemail/create`, newEmail, config);

}

// generates discount code characters 
function codeGenerator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

// generates discount code
async function generateDiscountCode(priceRuleID, value) {
    document.getElementById("spinnerCode").value = "Please wait...";

    const generateCode = codeGenerator(6)
    const newCode = {
        "code": `${generateCode}`,
        "priceRuleID": priceRuleID,
    }
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",

        },
        body: JSON.stringify(newCode),
    }

    const createDiscountCode = await axios.post(`https://spinwheelapp.herokuapp.com/api/discount-code/create`, newCode, config2);

    if (createDiscountCode.data.success === true) {
    
        document.getElementById("spinnerCode").value = newCode.code;
        storeDiscountCodes(spinWheelDOCId, newCode.code)

    }
}

// retrives pricerule
async function getPriceRule(getOfferText, getValue) {
    document.getElementById("spinnerCode").value = "Please wait...";

    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        }
    }
    const allPriceRules = await axios.get(`https://spinwheelapp.herokuapp.com/api/allpricerules`, config);


    const allPriceRulesArray = allPriceRules.data.allPriceRule
    const specificPriceRule = allPriceRulesArray.find(o => o.title === getOfferText)
    if (specificPriceRule) {
        generateDiscountCode(specificPriceRule.id, getValue)
    }

    if (!specificPriceRule) {
        generatePriceRule(getOfferText, getValue)
    }
}

//generates price rule
async function generatePriceRule(title, value) {

    const date = new Date();

    const priceRuleSchema = {

        "title": title,
        "target_type": "line_item",
        "target_selection": "all",
        "allocation_method": "across",
        "value_type": "fixed_amount",
        "value": "-" + value,
        "customer_selection": "all",
        "starts_at": `${date.toISOString()}`

    }
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(priceRuleSchema)
    }
    try {

        const newPriceRule = await axios.post(`https://spinwheelapp.herokuapp.com/api/price-rule`, priceRuleSchema, config2);
       
        getPriceRule(title, value)

    } catch (error) {
        console.log("error", error);
    }
}

// saves discount code to mongodb
async function storeDiscountCodes(id, newCode) {
    const discountCodeData = { discountCode: newCode }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false"
        },
        body: JSON.stringify(discountCodeData)
    }

    const saveDiscountCodeToDB = await axios.put(`https://spinwheelapp.herokuapp.com/api/update/discount/${id}`, discountCodeData, config);
   
}