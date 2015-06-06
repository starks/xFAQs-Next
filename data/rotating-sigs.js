if(typeof(Storage)!=="undefined") {
	var enableRotatingSigs = localStorage.getItem("enableRotatingSigs");
	var sigList = JSON.parse(localStorage.getItem("sigList"));
	
} else {
	var enableRotatingSigs;
	var sigList;
}

var sigListLength = sigList.signatures.length;
var randomSig = Math.floor(Math.random() * sigListLength - 1) + 1;
var board = $(".page-title").text();
var randomSignature = sigList.signatures[randomSig].signature;
var validSig = false;
var randomCounter = 0;

if(enableRotatingSigs == "checked") {
	while(validSig != true) {
		randomSig = Math.floor(Math.random() * sigListLength - 1) + 1;
		randomSignature = sigList.signatures[randomSig].signature;
		for(var j = 1; j <= sigList.signatures[randomSig].accounts.length; j++) {
			if((sigList.signatures[randomSig].accounts[0] == "") || (sigList.signatures[randomSig].accounts[j-1] == $(".welcome").text().slice(0, - 1))) {
				for(var i = 1; i <=  sigList.signatures[randomSig].boards.length; i++) {
					if(sigList.signatures[randomSig].boards[0] === "") {
						$("input[name='custom_sig']").after("<div class='head'><h2 class='title'>Custom Signature</h2></div>" + 
															"<textarea name='custom_sig' rows='2' cols='100' style='width:100%;'></textarea>");
						$("input[name='custom_sig']").remove();
						$("textarea[name='custom_sig']").val(randomSignature);
						validSig = true;
						break;
					} else if(board.toLowerCase() === sigList.signatures[randomSig].boards[i-1].toLowerCase()) {
						$("input[name='custom_sig']").after("<div class='head'><h2 class='title'>Custom Signature</h2></div>" + 
															"<textarea name='custom_sig' rows='2' cols='100'></textarea>");
						$("input[name='custom_sig']").remove();
						$("textarea[name='custom_sig']").val(randomSignature);
						validSig = true;
						break;
					}
				}
			}
		}
		
		randomCounter++;
		if(randomCounter > 100) {
			$("input[name='custom_sig']").after("<div class='head'><h2 class='title'>Custom Signature</h2></div>" + 
												"<textarea name='custom_sig' rows='2' cols='100'></textarea>");
			$("input[name='custom_sig']").remove();
			$("textarea[name='custom_sig']").val();
			validSig = true;
			break;
		}
	}
}