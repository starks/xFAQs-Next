if(typeof(Storage)!=="undefined") {
	var storage = localStorage.getItem("avatar");
} else {
	var storage = "left";
}

if( localStorage.getItem("enableWebm") != null) {
	var enableWebm = localStorage.getItem("enableWebm");
} else {
	localStorage.setItem("enableWebm", "not-checked");
}

if( localStorage.getItem("enableCode") != null) {
	var enableCode = localStorage.getItem("enableCode");
} else {
	localStorage.setItem("enableCode", "not-checked");
}

if( localStorage.getItem("enableQuickEdit") != null) {
	var enableQuickEdit = localStorage.getItem("enableQuickEdit");
} else {
	localStorage.setItem("enableQuickEdit", "not-checked");
}

if( localStorage.getItem("enableAvatars") != null) {
	var enableAvatars = localStorage.getItem("enableAvatars");
} else {
	localStorage.setItem("enableAvatars", "not-checked");
}

if( localStorage.getItem("enableHighlight") != null) {
	var enableHighlight = localStorage.getItem("enableHighlight");
} else {
	localStorage.setItem("enableHighlight", "not-checked");
}

if( localStorage.getItem("enableIgnore") != null) {
	var enableIgnore = localStorage.getItem("enableIgnore");
} else {
	localStorage.setItem("enableIgnore", "not-checked");
}

if( localStorage.getItem("enableBoardSelector") != null) {
	var enableBoardSelector = localStorage.getItem("enableBoardSelector");
} else {
	localStorage.setItem("enableBoardSelector", "not-checked");
}

if( localStorage.getItem("enableTTI") != null) {
	var enableTTI = localStorage.getItem("enableTTI");
} else {
	localStorage.setItem("enableTTI", "not-checked");
}

if( localStorage.getItem("maxWidth") != null) {
	var maxWidth = localStorage.getItem("maxWidth");
} else {
	localStorage.setItem("maxWidth", "500");
}

if( localStorage.getItem("maxHeight") != null) {
	var maxHeight = localStorage.getItem("maxHeight");
} else {
	localStorage.setItem("maxHeight", "500");
}

if( localStorage.getItem("enableRotatingSigs") != null) {
	var enableRotatingSigs = localStorage.getItem("enableRotatingSigs");
} else {
	localStorage.setItem("enableRotatingSigs", "not-checked");
}

if( localStorage.getItem("enableQuickTopic") != null) {
	var enableQuickTopic = localStorage.getItem("enableQuickTopic");
} else {
	localStorage.setItem("enableQuickTopic", "not-checked");
}

if( localStorage.getItem("enableAMP") != null) {
	var enableAMP = localStorage.getItem("enableAMP");
} else {
	localStorage.setItem("enableAMP", "not-checked");
}

if( localStorage.getItem("enableTracked") != null) {
	var enableTracked = localStorage.getItem("enableTracked");
} else {
	localStorage.setItem("enableTracked", "not-checked");
}

if( localStorage.getItem("searchTopics") != null) {
	var searchTopics = localStorage.getItem("searchTopics");
} else {
	localStorage.setItem("searchTopics", "not-checked");
}

if( localStorage.getItem("enableFilter") != null) {
	var enableFilter = localStorage.getItem("enableFilter");
} else {
	localStorage.setItem("enableFilter", "not-checked");
}



if(	localStorage.getItem("highlightList") != null ) {
	var highlightList = JSON.parse(localStorage.getItem("highlightList"));

} else {
 

	var highlightList =
	{ 	
		"groups": [
		
			{
				"groupName": "xFAQs Creator",
				"color": "#FFD9D9",
				"userNames": [ "Judgmenl" ] 
			},
			
		]
	};
	
	localStorage.setItem("highlightList", JSON.stringify(highlightList));


}


if(	localStorage.getItem("ignoreList") != null ) {
	var ignoreList = JSON.parse(localStorage.getItem("ignoreList"));

} else {
 

	var ignoreList =
	{ 	
		"users": [
				
		]
	};
	
	localStorage.setItem("ignoreList", JSON.stringify(ignoreList));


}


if(	localStorage.getItem("sigList") != null ) {
	var sigList = JSON.parse(localStorage.getItem("sigList"));

} else {
 

	var sigList =
	{ 	
		"signatures": [
				{
					"boards": [""],
					"accounts": [""],
					"signature": "powered by xfaqs"
				}
		]
	};
	
	localStorage.setItem("sigList", JSON.stringify(sigList));


}