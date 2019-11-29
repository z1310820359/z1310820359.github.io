'use strict'
var audioSource = document.querySelector("select#audioSource");
var audioOutput = document.querySelector("select#audioOutput");
var videoSource = document.querySelector("select#videoSource");

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
		var option = createElements('option');
		option.text = deviceInfo.label;
		option.value = deviceInfo.deviceId;
		if(deviceInfo.kind === 'audioSource'){
			audioSource.appendChild(option);
		}else if(deviceInfo.kind === 'audioOutput'){
			audioOutput.appendChild(option);
		}else if(deviceInfo.kind === 'videoSource'){
			videoSource.appendChild(option);
		}
	})
}
function handleError(err){
	console.log(err.name + " : " +err.message);
}