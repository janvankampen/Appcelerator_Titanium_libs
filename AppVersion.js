/*
 * DoodleSoft AppVersion Lib V1.0.0
 * 
 * Copy the lib to [your project folder]/app/lib
 * To get the current and newest version, use 
 * require('AppVersion').getVersions(function(currentVersion, newestVersion){
 * 	console.log(currentVersion);	
 * 	console.log(newestVersion);	
 * }); 
 * for example.
 * 
 * Functions:
 * getVersions(Function: callback(currentVersion, newestVersion))
 * getCurrentVersion() > Returns current App Version
 * compareVersions(String: currentVersionNumber, String: newestVersionNumber) > Returns 'newer', 'older', 'same' or false
 */

var appVersionDebug = true;
var iTunesStoreId = "";
var PlayStoreId = "";

function log(message){
	if(appVersionDebug){
		console.log("[DoodleSoft AppVersion Lib] "+message);
	}
}

function getVersions(cb) {
	log("Getting versions");
	if (OS_IOS) {
		getAppStoreVersion(cb);
	} else {
		getPlayStoreVersion(cb);
	}
}

exports.getVersions = getVersions;

function getAppStoreVersion(cb) {
	log("Getting App Store Version");
	var url = "http://itunes.apple.com/lookup?id="+ iTunesStoreId;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			try {
				var response = JSON.parse(this.responseText);
				if (response.resultCount > 0) {
					log("App Store version "+response.results[0].version);
					cb && cb(getCurrentVersion(), response.results[0].version);
				}else{
					log("App not found");
					cb && cb(getCurrentVersion(), null);
				}
			} catch (e) {
				log("Invalid JSON");
				cb && cb(getCurrentVersion(), null);
			}
		},
		onerror : function(e) {
			log("Request error")
			cb && cb(getCurrentVersion(), null);
		},
		timeout : 5000
	});
	client.open("GET", url);
	client.send();
}

function getPlayStoreVersion(cb) {
	log("Getting Play Store Version");
	var url = "https://play.google.com/store/apps/details?id="+PlayStoreId;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var response = this.responseText;
			if (response.indexOf('"softwareVersion">') !== -1) {
				response = response.split('"softwareVersion">')[1];
				response = response.split("<")[0];
				response = response.trim();
				log("Play Store version "+response)
				cb && cb(getCurrentVersion(), response);
			} else {
				log("Version not on page in this layout");
				cb && cb(getCurrentVersion(), null);
			}
		},
		onerror : function(e) {
			log("Request error");
			cb && cb(getCurrentVersion(), null);
		},
		timeout : 5000
	});
	client.open("GET", url);
	client.send();
}

function getCurrentVersion() {
	log("Getting current version");
	log("Current version "+Ti.App.version);
	return Ti.App.version;
}

function compareVersions(currentVersionNumber, newestVersionNumber) {
	log("Comparing versions "+currentVersionNumber+" and "+ newestVersionNumber);
	currentVersionNumber = currentVersionNumber.split(".");
	newestVersionNumber = newestVersionNumber.split(".");
	
	if (currentVersionNumber.length >= 3 && newestVersionNumber.length >= 3) {
		for(var i = 0 ; i < 3 ; i++){
			if (parseInt(currentVersionNumber[0]) < parseInt(newestVersionNumber[0])) {
				log("Current version is older than the newest version");
				return 'older';
			}else if (parseInt(currentVersionNumber[0]) > parseInt(newestVersionNumber[0])) {
				log("Current version is newer than the newest version");
				return 'newer';
			}
		}
		log("Current version is the same as the newest version");
		return 'same';
	} else {
		log("Versions don't have the format the lib expect");
		return false;
	}
}

exports.getVersions = getVersions;
exports.getCurrentVersion = getCurrentVersion;
exports.compareVersions = compareVersions;
