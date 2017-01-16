/*
 * DoodleSoft Browser Lib V1.0.0
 *
 * Lib checks if you can use SafariViewController (iOS), 
 * and excudes non-web urls from it.
 * 
 * Copy the lib to [your project folder]/app/lib
 * Add module 'ti.safaridialog' to your app
 * 
 * To open an url, use require('Browser').openURL("http://google.com"); for example.
 *
 * Functions:
 * openURL(String: url)
 */

var browserLibDebug = true;

function log(message) {
	if (browserLibDebug) {
		console.log("[DoodleSoft Browser Lib] " + message);
	}
}

function checkSafariViewController() {
	log("Checking if SafariViewController is available...");
	if (OS_IOS) {
		log("Is iOS");
		var version = Titanium.Platform.version.split(".");
		var major = parseInt(version[0], 10);
		if (major >= 9) {
			log("Is iOS 9 or higher");
			var safari = require("ti.safaridialog");
			if (safari.isSupported()) {
				log("SafariViewController is supported");
				return true;
			}
		} else {
			log("Is Android");
		}
	}

	log("SafariViewController isn't supported");
	return false;
}

function openURL(url) {
	log("Opening URL " + url);
	if (url.substring(0, 4) == "http") {
		log("URL is web URL");
		if (checkSafariViewController()) {
			log("Opening URL in SafariViewController");
			var safari = require("ti.safaridialog");
			safari.open({
				url : url
			});
		} else {
			log("Opening URL in native browser");
			Ti.Platform.openURL(url);
		}
	} else {
		log("Opening URL in native browser");
		Ti.Platform.openURL(url);
	}
};
exports.openURL = openURL; 