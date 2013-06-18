var http=require('http');
var https=require('https');
var NodePie = require("nodepie")
var store=require('./store').storage;
exports.fetchFeed=function(url,callback){
	var protocol;
	if(url.slice(0,5)=="https")
		protocol=https;
	else protocol=http;
	protocol.get(url,function(res){
		var buf="";
		res.on('data',function(chunk){
			var rss=chunk.toString();
			buf=buf+rss;
			
		});
		res.on('error',function(){})
		res.on('end',function(){
			try{
			var feed = new NodePie(buf);			
			feed.init();
			callback(feed);
			}
			catch(e){
				//
			}
		});
		
	}).on('error', function(e) {
	  //console.error(e);
	});
}

var main = function(){
	for(k in store.sub.Blog){
		
		exports.fetchFeed(store.sub.Blog[k].xmlUrl,function(feed){
		console.log(feed.getTitle()+":"+feed.getItemQuantity());
	});
	}
	
}

if (require.main === module) {
    main();
}