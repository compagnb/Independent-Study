//Barbara Compagnoni
//Freeing basis biometric data


//include modules ----------------------------------------------------------
var request = require('request'); //request module required to send username and password to url to receive data
var fs = require('fs'); //fs module required to write data to a file if needed
var pg = require('pg');  //pg module required to post info to postgres database
// var async = require('async'); //async module to help the flow of functions and avoid null input to database
// var socket = require('socket.io-client')('host to be input'); //socket module needed to test api data.

//include variables --------------------------------------------------------
var date = new Date(); //get date
var outputFile = 'metrics.json'; //file for metrics to be written
var access_token; //pulls internal access token so we can gather data
var username = ''; //username for basis account
var password = ''; //password for basis account
var freq = 60000; //sets the frequency to 60000 milliseconds or 1 minute
var requestDate;

var heartArray = [];
var caloriesArray = [];
var stepsArray = [];
var gsrArray = [];
var skin_tempArray = [];

var metricData; //

var conString = "postgres://barb:basisdata@basisdata.cruj1d5neyqx.us-west-2.rds.amazonaws.com:5432/postgres"; //connection string for database

//functions ----------------------------------------------------------------

function formatDate(date){
    //function to format date as "year-mo-da" for request url

    var year = date.getFullYear(); //get the full year
    // console.log(year); //print the output for testing

    var mo = date.getMonth(); //get the month
    var month = formatMo(mo); //format the month
    // console.log(month); //print the output for testing

    var d = date.getDate(); //get the date
    var da = formatDay(d); //format the date
    // console.log(da); //print the output for testing

    console.log(year + "-" + month + "-" + da); //print the output for testing
    return year + "-" + month + "-" + da; //return the formated current date
}

function formatMo(mo){
    mo += 1;
    if (mo <10){
        return "0"+ mo;
    }else if (mo > 9){
        return mo;
    }
}

function formatDay(d){
    if(d < 10){
        return "0"+d;
    }else{
        return d;
    }
}

function cleanToken(token){
        var newToken = token.split(";"); //break it at the first ";"
        var cleanToken = newToken[0].substr(newToken[0].indexOf("=")+1,  newToken[0].length); //then subtract the "="
        // console.log(cleanToken) //test output
        return cleanToken; //return the token!
    }

var requestData = function (usr, psw) {
    console.log( "logging into site using credentials");
    request({
        uri: 'https://app.mybasis.com/login', //login site
        method: 'POST', //posting data
        form: { //form id to fill in with appropriate variables
            username: usr,
            password: psw
        },
        followRedirect: true, //follow the redirect so we can get accessToken
        maxRedirects: 10, //only allow 10 redirects
        jar: true //create new cookie jar
    }, function (e, r, data) {
        if (e) { //if there is an error the console it!
            return console.log(e);
        }
        getToken(e, r, data);//if not get my token!!!
    });
};

function getToken(error, response) {
    console.log("getting the access token");
    if (error) {
        return console.log(error) //if there is an error the console it!
    }
    access_token = cleanToken(response.headers['set-cookie'][1]); //grab the access token from the set-cookie header

    request.get({//get page for my data!
        url: 'https://app.mybasis.com/api/v1/user/me.json',
        jar: access_token,
        json: true
    }, function(e, r, user) {
        if (e) {
            return console.log(e) //if there is an error the console it!
        }
        requestDate = formatDate(date); //fix date format so we can request data!
        getData(requestDate); //now gather metric data
    })
}

var getData = function(date) {

    var sleepUrl = 'https://app.mybasis.com/api/v2/users/me/days/' + requestDate + '/activities?type=sleep&expand=activities'; //page for sleep data including all options offered (that I know of)
    var activitiesUrl = 'https://app.mybasis.com/api/v2/users/me/days/' + requestDate + '/activities?type=run,walk,bike&expand=activities'; //page for activity data including all options offered (that I know of)
    var metricsUrl = 'https://app.mybasis.com/api/v1/metricsday/me?day=' + requestDate + '&heartrate=true&steps=true&calories=true&gsr=true&skin_temp=true&bodystates=true'; //page for metrics including all options offered (that I know of)

    request.get({ //get page for metrics below
        url: metricsUrl,
        jar: access_token,
        json: true
    }, function(e, r, data) {
        if (e) {
            return console.log(e) //if there is an error the console it!
        }
        //console.log(data); //for testing
        parseData(data);
        // console.log(heartArray[heartArray.length-1] + "," + caloriesArray[caloriesArray.length-1] + "," + stepsArray[stepsArray.length-1] + "," + gsrArray[gsrArray.length-1] + "," + skin_tempArray[skin_tempArray.length-1]);
        uploadDataToDB(heartArray[heartArray.length-1], caloriesArray[caloriesArray.length-1], stepsArray[stepsArray.length-1], gsrArray[gsrArray.length-1], skin_tempArray[skin_tempArray.length-1]);
        writeDataToFile(data);

    })
}

function parseData(data){
    console.log("parsing data...");
    //reset arrays
    heartArray = [];
    caloriesArray = [];
    stepsArray = [];
    gsrArray = [];
    skin_tempArray = [];

    //put data in arrays
    heartArray = data.metrics.heartrate.values;
    caloriesArray = data.metrics.calories.values;
    stepsArray = data.metrics.steps.values;
    gsrArray = data.metrics.gsr.values;
    skin_tempArray = data.metrics.skin_temp.values;
}

function writeDataToFile(data){
    fs.writeFile(outputFile, JSON.stringify(data, null, 4), function(err) {
        if (err) {
            console.log(err)
        } else {
            console.log('JSON saved to ' + outputFile)
        }
    })
}

function uploadDataToDB(heart, calories, step, gsr, skinTemp){

    pg.connect(conString, function(err, client, done) {
        if(err) {
          return console.error('error fetching client from pool', err);
        }
        // client.query("INSERT INTO barbData VALUES (DEFAULT,NULL ,NULL, NULL,NULL, NULL);", function(err, result) {
        client.query("INSERT INTO barbData VALUES (DEFAULT, " + heart +","+ calories +","+ step +","+ gsr  +","+ skinTemp +");", function(err, result) {
         //call `done()` to release the client back to the pool
         done();

        if(err) {
          return console.error('error running query', err);
        }
        console.log(result);
      });
    });
}


//testing for deliverables -------------------------------------------------

setInterval(function() {
    console.log('refreshing data...');
    formatDate(date);
    requestData(username, password)

    // console.log(sleep);
    // console.log(activities);
    // console.log(details);


}, freq)
