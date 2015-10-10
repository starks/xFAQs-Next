if(typeof(Storage)!=="undefined") {
	var enableQuickTopic = localStorage.getItem("enableQuickTopic");
	
} else {
	var enableQuickTopic;
}

if(enableQuickTopic == "checked") {
	if($(".action").eq(0).text() == " New Topic") {
		var key;
		var postUrl = $(".action > a").attr("href");

		

		
		$(".paginate.user").append("<li id='topicToggle' class='action' ><a href='#' class='qt-action'>Quick Topic</a></li>");
		
		$("#topicToggle").click(function() {
			if(!$("#topicForm").html()) {
			
				if(!key) {
					$.ajax({
						type: "POST",
						url: postUrl,
						async: false
					}).done(function(response) {
						key = response.match(/key" value="([^"]*)"/)[1];
					});
				}
				
				var topicForm = '<div id="quickTopic" class="reg_dialog" style="position:fixed;left:25%;top:10%;width:50%"><form method="post" id="topicForm" action="' + $(".action > a").attr("href") + '"><input type="hidden" value="' + key + '" name="key"> \
										<div class="pod"> \
												<div class="body"> \
													<div class="details"> \
														<p><b>Topic Title:</b> \
														<input id="quickTopicTitle" type="text" onkeyup="sub_cc(this.form.topictitle)" value="" name="topictitle" maxlength="80" size="70"><br> \
													<p>' + formatter + '<textarea id="quickTopicPost" onkeyup="msg_cc(this.form.messagetext)" name="messagetext" rows="20" cols="100" style="width: 100%;"></textarea></p> \
													<div class="head"><h2 class="title" style="font-family: &quot;nimbus-sans&quot;,&quot;Helvetica Neue&quot;,&quot;HelveticaNeue&quot;,Arial,sans-serif; font-weight: 700; letter-spacing: -1px; text-transform: none;">Custom Signature</h2></div><textarea cols="100" rows="2" name="custom_sig" style="width: 100%;"></textarea> \
													<input style="margin-top:10px;" type="submit" id="postMsg" name="post" value="Post without Preview" class="btn btn_primary"> <input style="margin-top:10px;" type="reset" onclick="return confirm(\'Are you sure? This will clear your entire post so far.\')" class="btn" name="reset" value="Reset"> <input style="margin-top:10px;" type="button" id="qt-close" class="btn" name="close" value="Close">\
												</div> \
											</div> \
										</div> \
									</form></div>';
									
				$("body").append(topicForm);
				
				$('[name="b"]').click(function() {txtTagEdit('b');});
				$('[name="i"]').click(function() {txtTagEdit('i');});
				$('[name="spoiler"]').click(function() {txtTagEdit('spoiler');});
				$('[name="cite"]').click(function() {txtTagEdit('cite');});
				$('[name="quote"]').click(function() {txtTagEdit('quote');});
				$('[name="code"]').click(function() {txtTagEdit('code');});
				$('[name="strike"]').click(function() {txtTagEdit('strike');});
				$('[name="underline"]').click(function() {txtTagEdit('underline');});

				
				$("#qt-close").click(function() {
					$("#quickTopic").remove();
				});
				
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
			} else {
				$("#quickTopic").remove();
			}			

		});
		
	}
}
