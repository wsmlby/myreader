// parse xml
var fs = require('fs'),
    xml2js = require('xml2js');


function parseReader(data){
	var out={};
	for(var i=0;i<data.length;i++){
		var y=data[i].$;
		if(y.type=="rss"){
			out[y.title]=y;	
		}else{
			out[y.title]=parseReader(data[i].outline);
		}
	}
	return out;
}
exports.parseReaderXml=function(readerXml,resultcallback){
	var parser = new xml2js.Parser();
	parser.addListener('end', function(result) {
		var data=result.opml.body[0].outline;
		data=parseReader(data);
		resultcallback(data);
	});	
	parser.parseString(readerXml);
}


	 
var main = function(){
	var data=fs.readFileSync('data/upload/sub.xml');

	exports.parseReaderXml(data,function(dat){
		fs.writeFile('data/store/sub.js',JSON.stringify(dat),function(err,data){});		
	});
	
}

if (require.main === module) {
    main();
}

