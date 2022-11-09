var myVersion = "0.40", myProductName = "testRssCloud", myPort = 2222, myDomain = "fedwiki.andysylvester.com"; 

//Test app for Andrew Shell's rssCloud server
//https://github.com/andrewshell/rsscloud-server

var request = require ("request");
var http = require ("http"); 
var urlpack = require ("url");
var dns = require ("dns");
var qs = require ("querystring");

const fs = require ("fs");
const utils = require ("daveutils");
const reallysimple = require ("reallysimple");


var urlRssCloudServer = "http://rpc.rsscloud.io:5337/pleaseNotify";
// var urlHackerNews = "https://rsscloud.andysylvester.com/feed/";
// var urlHackerNews = "http://hn.geekity.com/newstories.xml";
// var urlHackerNews = "http://oldschool.scripting.com/PDXProtestNews/rss.xml";
var urlHackerNews = "http://data.feedland.org/feeds/AndySylvester99.xml";

var whenLastPleaseNotify = new Date (0);

var titleTest = "Test title";

function feedUpdated (urlFeed) { //called when the feed updates
	console.log ("feedUpdated: url == " + urlFeed + ", now == " + new Date ().toLocaleString ());

	reallysimple.readFeed (urlFeed, function (err, theFeed) {
		if (err) {
			console.log (err.message);
			}
		else {
			var jsontext = utils.jsonStringify (theFeed.title) + "\n" + utils.jsonStringify (theFeed.items[0].title);
			if (utils.jsonStringify (theFeed.items[0].title) === undefined)
			{ 
				jsontext = utils.jsonStringify (theFeed.title) + "\n" + utils.jsonStringify (theFeed.items[0].description);
			}
			console.log ("theFeed == " + jsontext);
			titleTest = titleTest + "\n\n" + jsontext + "\n\n";
			}
		});


	}
function pleaseNotify (urlServer, domain, port, path, urlFeed, callback) {
	var theRequest = {
		url: urlServer,
		headers: {Accept: "application/json"},
		method: "POST",
		form: {
			domain: domain,
			port: port,
			path: path,
			url1: urlFeed,
			protocol: "http-post"
			}
		};
	request (theRequest, function (error, response, body) {
		if (!error && (response.statusCode == 200)) {
			var serverResponse = JSON.parse (response.body);
			if (callback) {
				callback (serverResponse) 
				}
			}
		else {
			console.log ("pleaseNotify: error, code == " + response.statusCode + ", " + response.body + ".\n");
			}
		});
	}
function handleRequest (httpRequest, httpResponse) {
	try {
		var parsedUrl = urlpack.parse (httpRequest.url, true);
		var lowerpath = parsedUrl.pathname.toLowerCase ();
		switch (httpRequest.method) {
			case "GET":
				switch (lowerpath) {
					case "/now":
						httpResponse.writeHead (200, {"Content-Type": "text/plain"});
						httpResponse.end (new Date ().toString ());    
						break;
					case "/feedupdated":
						var challenge = parsedUrl.query.challenge;
						console.log ("/feedupdated: challenge == " + challenge);
						httpResponse.writeHead (200, {"Content-Type": "text/plain"});
						httpResponse.end (challenge);    
						break;
					default: 
						// httpResponse.writeHead (404, {"Content-Type": "text/plain"});
						// httpResponse.end ("Not found");    
						httpResponse.writeHead (200, {"Content-Type": "text/plain"});
						httpResponse.end (titleTest);    
					}
				break;
			case "POST":
				var body = "";
				httpRequest.on ("data", function (data) {
					body += data;
					});
				httpRequest.on ("end", function () {
					var postbody = qs.parse (body);
					switch (lowerpath) {
						case "/feedupdated":
							feedUpdated (postbody.url);
							httpResponse.writeHead (200, {"Content-Type": "text/plain"});
							httpResponse.end ("Thanks for the update! :-)");    
							break;
						default: 
							httpResponse.writeHead (404, {"Content-Type": "text/plain"});
							httpResponse.end ("Not found");    
						}
					});
				break;
			}
		}
	catch (tryError) {
		httpResponse.writeHead (503, {"Content-Type": "text/plain"});
		httpResponse.end (tryError.message);    
		console.log ("handleRequest: tryError.message == " + tryError.message);
		}
	}
function secondsSince (when) { 
	var now = new Date ();
	when = new Date (when);
	return ((now - when) / 1000);
	}
function everyMinute () {
	if (secondsSince (whenLastPleaseNotify) > (24 * 60 * 60)) {
		pleaseNotify (urlRssCloudServer, myDomain, myPort, "/feedupdated", urlHackerNews, function (response) {
			console.log ("\npleaseNotify: success == " + response.success + ", msg == \"" + response.msg + "\"\n");
			whenLastPleaseNotify = new Date ();
			});
		}
	}
function startup () {
	console.log ("\n" + myProductName + " v" + myVersion + " running on port " + myPort + ".\n");
	http.createServer (handleRequest).listen (myPort);
	everyMinute ();
	setInterval (everyMinute, 60000); 
	}
startup ();
