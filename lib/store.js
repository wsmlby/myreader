
var fs=require('fs');
var storage={};
var files=fs.readdirSync("data/store/");
for(var i=0;i<files.length;i++){
	var fn=files[i];
	if(fn.slice(fn.length-5)==".json"){
		
		var data=fs.readFileSync("data/store/"+fn);	
		storage[fn.slice(0,fn.length-5)]=JSON.parse(data);
		console.log("[Storage]"+fn+ " loaded!");	
	}
	else{
		console.log("[Storage]Skipped "+fn);
	}
}
exports.storage=storage;

