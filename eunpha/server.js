var http = require('http');
var url = require("url");
var requestHandlers = require("./requestHandlers");
var qs = require('querystring');

var urlPath = new Array();
urlPath["/"] = requestHandlers.index;
urlPath["/login"] = requestHandlers.login;
urlPath["/error"] = requestHandlers.error;

http.createServer(function (request, response) {
 	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");
	/* do something */
	/*need*/
	if (pathname != "/favicon.ico") {
		/* global error page */
		console.log(pathname);
		console.log(urlPath[pathname]);
		if(urlPath[pathname] == null || urlPath[pathname] == undefined ){
			urlPath["/error"](request,response,parameter);
			return;
		}
		/* do something */
		if(request.method == "POST"){
			console.log("method POST");
			var data = "";
			request.on('data', function(postData){
				data += postData;
			});
			request.on('end', function(postData){
				var parameter = qs.parse(data);
				urlPath[pathname](request,response,parameter);
			});
		} else {
			console.log("method GET");
			var parameter = url.parse(request.url,true).query;
			urlPath[pathname](request,response,parameter);
		}
	}

    //response.writeHead(200, {"Content-Type": "text/plain"});
    //response.end();
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');