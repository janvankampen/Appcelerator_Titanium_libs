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
			createGenerator();
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
function createGenerator(){
	generator = Ti.UI.iOS.createFeedbackGenerator({type:Ti.UI.iOS.FEEDBACK_GENERATOR_TYPE_SELECTION});
	log("Created the generator");
}

var generator = null;
var hasHapticEngine = hasHapticEngineCheck();

function hapticFeedbackSelection(){
	if(!hasHapticEngine){
		return;
	}
	generator.setType(Ti.UI.iOS.FEEDBACK_GENERATOR_TYPE_SELECTION);
	generator.style = null;
	generator.prepare();
	generator.selectionChanged();
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
	
	generator.setType(Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_NOTIFICATION);
	generator.style = null;
	generator.prepare();
	generator.notificationOccurred(notification_type);
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
	
	generator.setType(Titanium.UI.iOS.FEEDBACK_GENERATOR_TYPE_IMPACT);
	generator.style = impact_type;
	generator.prepare();
	generator.impactOccurred();
	log("Haptic Impact "+impact_type);
}
exports.hapticFeedbackImpact = hapticFeedbackImpact;
