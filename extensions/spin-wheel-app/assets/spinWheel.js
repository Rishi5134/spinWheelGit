$(document).ready(function () {
    console.log("Checking cookie");

    checkCookie();
});

// openSpinCounter();
// addSpinnedEmails()
var script2 = document.createElement('link');
script2.rel = 'stylesheet';
script2.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
document.getElementsByTagName('head')[0].appendChild(script2);

console.log("Script Added", script2);
getSpinnedCounter();

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
    console.log("padding KWidth");
    responsivePadding(1040, 1040, 800, 2000)
}
if (LaptopLWidth) {
    console.log("padding LaptopL");
    responsivePadding(500, 500, 450, 2000)
}
if (TabletWidth) {
    console.log("padding Tablet");
    responsivePadding(500, 500, 325, 2000)
}
if (MobileWidth) {
    console.log("padding Mobile");
    responsivePadding(250, 500, 225, 2000)
}


function responsiveContainer(v1, v2) {
    container = svg.append("g")
        .attr("class", "submitSpin")
        .attr("transform", "translate(" + (v1) + "," + (v2) + ")")
}
// if (KWidth) {
//     console.log("KWidth done");

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


//  //container

// }
if (matchMedia("(max-width: 240px)").matches) {
    console.log("ertert");

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
    { "label": "RS 20", "value": 0, "offerText": "RS 20 OFF", "offerCode": "EU00FN" },
    { "label": "RS 10", "value": 40, "offerText": "RS 40 OFF", "offerCode": "GR40QE" },
    { "label": "RS 5", "value": 5, "offerText": "RS 50 OFF", "offerCode": "OP50RE" },
    { "label": "RS 30", "value": 30, "offerText": "RS 30 OFF", "offerCode": "YJ30BR" },
    { "label": "RS 50", "value": 50, "offerText": "RS 50 OFF", "offerCode": "OP50RE" },
    { "label": "RS 1", "value": 10, "offerText": "RS 1 OFF", "offerCode": "AE60MO" },
    { "label": "RS 0", "value": 0, "offerText": "RS 0 OFF", "offerCode": "EU00FN" },
    { "label": "RS 10", "value": 10, "offerText": "RS 60 OFF", "offerCode": "AE60MO" },
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
    console.log("Cont KWidth");
    responsiveContainer(500, 500)
}
if (LaptopLWidth) {
    console.log("Cont LaptopL");

    responsiveContainer(250, 250)
}
if (TabletWidth || MobileWidth) {
    console.log("Cont Tablet");

    responsiveContainer(250, 250)
}
if (MobileWidth) {
    console.log("Cont Tablet");

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

    // email validation

    console.log("Welcome to the Spinner!");
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
            const addEmail = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spinemail/one?email=${email}`, config);
            console.log("Email Found:-->", addEmail.data.found);
            if (addEmail.data.found === null) {
                addSpinnedEmails();



                container.on("click", null);
                //all slices have been seen, all done
                console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
                if (oldpick.length == data.length) {
                    console.log("done");
                    container.on("click", null);
                    return;
                }
                if (oldpick.length > 0) {
                    console.log("done");
                    container.on("click", null);
                    alert('Spin completed!!')
                    return;
                }
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
                        d3.select("#spinnerCode")
                            .attr('value', data[picked].offerCode);
                        oldrotation = rotation;

                        /* Get the result value from object "data" */
                        console.log(data[picked].value)

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
    console.log("TabletWidth Spincircle");
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


function getRandomNumbers() {
    var array = new Uint16Array(1000);
    var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
    if (window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function") {
        window.crypto.getRandomValues(array);
        console.log("works");
    } else {
        //no support for crypto, get crappy random numbers
        for (var i = 0; i < 1000; i++) {
            array[i] = Math.floor(Math.random() * 100000) + 1;
        }
    }
    return array;
}

document.getElementById('closeSpin').onclick = function () {
    closeSpinCounter();
    if (document.getElementById('spin_block').style.display == "flex") {
        document.getElementById('mainSpinnner').style.width = "0rem";
        document.getElementById('mainSpinnner').style.height = "0rem";

        document.getElementById('mainSpinnner').style.zIndex = "-1"
        // document.getElementById('spinnWheel').style.zIndex = "0"

        document.getElementById('spin_block').style.display = "none";
        console.log('closed')
    }
}
document.getElementById('spinnerImage').onclick = function () {
    openSpinCounter();
    console.log("image clicked");
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
        console.log('opened')
    }
}
const mediaQuery = window.matchMedia('(max-width: 730px)')
// Check if the media query is true
if (mediaQuery.matches) {
    document.getElementById('spin_block').style.flexDirection = "column";
    //    document.getElementById('spin_block').style.justifyContent = "center";
    document.getElementById('spin_block').style.alignItems = "center";

}




document.getElementById('submitSpin').addEventListener('click', spin);
// document.getElementById('spinnerCode').addEventListener('click', copyText);



function myGreeting() {
    document.getElementById('spin_block').style.display = "flex";
    openSpinCounter();
    console.log('Hello world3333');
}



if (KWidth.matches) {
    document.getElementsByClassName('spinText').style.fontSize = "4rem";
} else {
    document.getElementsByClassName('spinText').style.fontSize = "2rem";

}



function validateemail() {
    console.log("werwer");
    var x = document.myform.email.value;
    var atposition = x.indexOf("@");
    var dotposition = x.lastIndexOf(".");
    if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= x.length) {
        alert("Please enter a valid e-mail address \n atpostion:" + atposition + "\n dotposition:" + dotposition);
        return false;
    }
}

function spinwheelCookieGenerator(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    console.log("Value:", result);
    return result;
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("exdays", exdays)
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
        console.log("Spin wheel cookie is:--> " + spinCookie);
        document.getElementById('mainSpinnner').style.width = "0rem";
        document.getElementById('mainSpinnner').style.height = "0rem";

        document.getElementById('mainSpinnner').style.zIndex = "-1"
        // document.getElementById('spinnWheel').style.zIndex = "0"

        document.getElementById('spin_block').style.display = "none";
        console.log('Cookie found, spin wheel closed')
    } else {
        setCookie("spinwheel-cookie", spinwheelCookieGenerator(30), 1);
        console.log("spinwheel-cookie generated " + spinCookie);
        window.addEventListener('load', (event) => {

            console.log('page is fully loaded');
        });
        const myTimeout = setTimeout(myGreeting, 3000);
    }
}

async function getSpinnedCounter(){
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    console.log(doc.spinned);
    document.getElementById('spinCounter').innerHTML = `Spinned by ${doc.spinned} people`;
}
async function openSpinCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(1, 0, 0);
    }
    console.log("Counters", doc);
    const counterValues = {
        "openedSpinwheel": doc.openedSpinwheel + 1,


    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters/update/${doc._id}`, counterValues, config);
    console.log("Opened Counter :-->", data);
}
async function closeSpinCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(0, 1, 0);
    }
    console.log("Counters", doc);
    const counterValues = {
        "closedSpinwheel": doc.closedSpinwheel + 1,
    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters/update/${doc._id}`, counterValues, config);
    console.log("Closed Counter :-->", data);
}

async function spinnedSpinCounter() {
    const config2 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
    }
    const allCounters = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters`, config2);
    const doc = allCounters.data.data[0];
    if (!doc) {
        createSpinDoc(0, 0, 1);
    }
    console.log("Counters", doc);
    const counterValues = {
        "spinned": doc.spinned + 1,
    }
    const config = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(counterValues),
    }
    const { data } = await axios.put(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters/update/${doc._id}`, counterValues, config);
    console.log("Spinneed Counter Updated :-->", data);
}


async function createSpinDoc(a, b, c) {
    const createDoc = {
        "openedSpinwheel": a,
        "closedSpinwheel": b,
        "spinned": c
    }
    const config3 = {
        headers: {
            "ngrok-skip-browser-warning": "false",
        },
        body: JSON.stringify(createDoc)
    }
    const createSpinCounterDoc = await axios.post(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spincounters/create`, createDoc, config3);
    console.log("Counter created :-->", createSpinCounterDoc);
}


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
    console.log(document.getElementById('spinner-email').value);
    const getAllEmails = await axios.get(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spinemails`, config);
    console.log("All Emails :-->", getAllEmails);


    const getOneDoc = getAllEmails.data.emails[0]
    if (!getOneDoc) {
        createEmailDoc()
    }
    console.log("One Doc :-->", getOneDoc);
    const addEmail = await axios.put(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spinemail/update/${getOneDoc._id}`, newEmail, config2);
    console.log("Email Added Successfully", addEmail);
}


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
    const addEmail = await axios.post(`https://aa22-2405-201-200c-69d7-898e-cf84-e44-c48c.in.ngrok.io/api/spinemail/create`, newEmail, config);
    console.log("New Email Added Successfully", addEmail);
}