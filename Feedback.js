/*
 * DoodleSoft Feedback Lib V1.0.0
 * 
 * Copy the lib to [your project folder]/app/lib
 * To use haptic feedback, use require('Feedback').hapticFeedbackImpact("light"); for example.
 * 
 * Note: Works only on iPhone 7 (or newer) with iOS 10 (or newer)
 * 
 * Functions:
 * hapticFeedbackSelection()
 * hapticFeedbackNotification(notification_type) (String: succes, warning, error)
 * hapticFeedbackImpact(impact_type) (String: light, medium, heavy)
 */

var feedbackLibDebug = true;

function log(message){
	if(feedbackLibDebug){
		console.log("[DoodleSoft Feedback Lib] "+message);
	}
}
function hasHapticEngineCheck(){
	if(OS_IOS){
		if(parseInt(Titanium.Platform.version.split(".")[0])>=10){
			log("Has iOS 10 or higher");
			createGenerators();
			return true;
		}else{
			log("Has iOS 9 or lower");
			log("Cannot create generator");
			return false;
		}
	}else{
		log("Is Android");
		log("Cannot create generator");
		return false;
	}
}
function createGenerators(){
	generatorSelection = Ti.UI.iOS.createFeedbackGenerator({type:Ti.UI.iOS.FEEDBACK_GENERATOR_TYPE_SELECTION});
	generatorImpact = Ti.UI.iOS.createFeedbackGenerator({type:Ti.UI.iOS.FEEDBACK_GENERATOR_TYPE_IMPACT});
	generatorNotification = Ti.UI.iOS.createFeedbackGenerator({type:Ti.UI.iOS.FEEDBACK_GENERATOR_TYPE_NOTIFICATION});
	log("Created the generator");
}

var generatorSelection = null;
var generatorImpact = null;
var generatorNotification = null;
var hasHapticEngine = hasHapticEngineCheck();

function hapticFeedbackSelection(){
	if(!hasHapticEngine){
		return;
	}
	generatorSelection.prepare();
	generatorSelection.selectionChanged();
	log("Haptic Selection ");
}
exports.hapticFeedbackSelection = hapticFeedbackSelection;

function hapticFeedbackNotification(notification_type){
	if(!hasHapticEngine){
		return;
	}
	if(notification_type=="success"){
		notification_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_SUCCESS;
	}else if(notification_type=="warning"){
		notification_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_WARNING;
	}else{
		notification_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_NOTIFICATION_TYPE_ERROR;
	}
	
	generatorNotification.prepare();
	generatorNotification.notificationOccurred(notification_type);
	log("Haptic Notification "+notification_type);
}
exports.hapticFeedbackNotification = hapticFeedbackNotification;

function hapticFeedbackImpact(impact_type){
	if(!hasHapticEngine){
		return;
	}
	if(impact_type=="light"){
		impact_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_LIGHT;
	}else if(impact_type=="medium"){
		impact_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_MEDIUM;
	}else{
		impact_type = Titanium.UI.iOS.FEEDBACK_GENERATOR_IMPACT_STYLE_HEAVY;
	}
	
	generatorImpact.style = impact_type;
	generatorImpact.prepare();
	generatorImpact.impactOccurred();
	log("Haptic Impact "+impact_type);
}
exports.hapticFeedbackImpact = hapticFeedbackImpact;
