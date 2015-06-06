var accountSwitcher = localStorage.getItem("accountSwitcher");

if(accountSwitcher == "checked") {
	function loginClickHandler(i) {
		return function() {
			var key;
			
			$.ajax( {
				type: "GET",
				url: "/user/logout.html",
				async: false
			});			
					
			if(!key) {
				$.ajax({
					type: "POST",
					url: "/",
					async: false
				}).done(function(response) {
					key = response.match(/key" value="([^"]*)"/)[1];
				});
			}
			
			var formData = "EMAILADDR=" + accountJSON.accounts[i].name + "&PASSWORD=" + accountJSON.accounts[i].pass + "&key=" + key + "&path=http://www.gamefaqs.com/";
			
			$.ajax({
				type: "POST",
				url: "/user/login.html",
				data: formData,
				async: false
			}).done(function() {
				location.reload(true);
			});
			
		}
	}

	$(".masthead_user").append("<a href='#' id='AccountSwitch'>Account Switcher</a>");

	$("#AccountSwitch").click(function() {

		var topicForm = "<div id='AccountSwitchPanel' class='reg_dialog' style='position:fixed;left:25%;top:10%;width:50%'>" +
							"<div style='padding:10px;'><h3>Account Switcher</h3>" +
							"<p>";
		
		topicForm += "<table>";
		
		for(var i = 0; i < accountJSON.accounts.length; i++) {
			topicForm += "<tr><td>" + accountJSON.accounts[i].name + "</td><td><button class='btn' id='asLogin-" + i + "'>Log in</button></td></tr>";
		}
			
		topicForm += "<table>";		
							
		topicForm += "<br><button class='btn' id='AccountSwitchClose'>Close</button>" +
						"</p>" +
						"</div></div>";

		$("body").append(topicForm);
		
		for(var i = 0; i < accountJSON.accounts.length; i++) {
			$("#asLogin-" + i).click(loginClickHandler(i));
		}
		
		$("#AccountSwitchClose").click(function() {
			$("#AccountSwitchPanel").remove();
		});

	});
	
}