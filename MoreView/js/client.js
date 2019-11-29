'use strict'
if(!navigator.mediaDevices||
 !navigator.mediaDevices.enumerateDevices){
	console.log('enumerateDevices is not supported');
}else {
	navigator.mediaDevices.enumerateDevices().then(gotDevices).catch(handleError);
}
function gotDevices(deviceInfos){
	deviceInfos.forEach( function(deviceInfo){
		console.log(deviceInfo.kind + ':' + deviceInfo.label +"; id = " +
		+deviceInfo	.deviceId + ": groupId =" + deviceInfo.groupId);
	})
}
function handleError(err){
	console.log(err.name + " : " +err.message);
}