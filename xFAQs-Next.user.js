// ==UserScript==
// @name         xFAQs-Next
// @namespace    xfaqs
// @version      0.1.0
// @description  xFAQs For the New Message Board Beta
// @author       @Kraust / Judgmenl
// @match        http://*.gamefaqs.com/*
// @grant        none
// ==/UserScript==

// http://www.nostlagiasky.pw
// https://github.com/Kraust/xFAQs-Next

// TODOs:
// 3. Get the "MASTER" User Variable to work in all cases
// 2. Settings Page (In the same Style as xfaqs does now) - Partial}


// Note: jQuery is provided by GameFAQs by default. I will be using it a lot in this code.
if(jQuery) 
{
	// The _SETTINGS_ Global
	// Use this to store user settings.
	if(	localStorage.getItem("_SETTINGS_") != null ) 
	{
		var _SETTINGS_ = JSON.parse(localStorage.getItem("_SETTINGS_"));
		var enableAMP = _SETTINGS_.settings[0].enableAMP;
        var enablePopular = _SETTINGS_.settings[0].enablePopular;
		var searchTopics = _SETTINGS_.settings[0].searchTopics;
		var enableWebm = _SETTINGS_.settings[0].enableWebm;
		var enableGifv = _SETTINGS_.settings[0].enableGifv;
		var enableImages = _SETTINGS_.settings[0].enableImages;
		var enableYoutube = _SETTINGS_.settings[0].enableYoutube;
		var msgBelowLeftOfPost = _SETTINGS_.settings[0].msgBelowLeftOfPost;
		var enableAvatars = _SETTINGS_.settings[0].enableAvatars;
		var enableAccountSwitcher = _SETTINGS_.settings[0].enableAccountSwitcher;

	} else 
	{
		var _SETTINGS_ =
		{ 	
			"settings": [
				{
					"enableAMP": false,
					"enablePopular": false,
					"searchTopics": false,
					"enableWebm": false,
					"enableGifv": false,
					"enableImages": false,
					"enableYoutube": false,
					"msgBelowLeftOfPost": false,
					"enableAvatars": "disabled",
					"enableAccountSwitcher": false
				}
			],
			"highlight-groups": [
			
				{
					"groupName": "xFAQs Creator",
					"color": "#FFD9D9",
					"userNames": [ "Judgmenl" ] 
				}
			
			],
			
			"ignored-users": [
					
			],
			
			"signatures": [
					{
						"boards": [""],
						"accounts": [""],
						"signature": "powered by xfaqs"
					}
			],
			
			"accounts": [
		
			]

		};
		localStorage.setItem("_SETTINGS_", JSON.stringify(_SETTINGS_));
		var enableAMP = _SETTINGS_.settings[0].enableAMP;
		var enablePopular = _SETTINGS_.settings[0].enablePopular;
		var searchTopics = _SETTINGS_.settings[0].searchTopics;
		var enableWebm = _SETTINGS_.settings[0].enableWebm;
		var enableGifv = _SETTINGS_.settings[0].enableGifv;
		var enableImages = _SETTINGS_.settings[0].enableImages;
		var enableYoutube = _SETTINGS_.settings[0].enableYoutube;
		var msgBelowLeftOfPost = _SETTINGS_.settings[0].msgBelowLeftOfPost;
		var enableAvatars = _SETTINGS_.settings[0].enableAvatars;

	}
	
	// The "MASTER" user variable should be used in any case where you want the user's name.
	// I forget how to get the "accurate" Username... There are a few ways to get it. Going to use the welcome class for now.
	// This may be the incompatible one.
	var _USER_ = $(".welcome").text().slice(0, - 1).replace(/ /g,"_");
	var upload_user = _USER_ + " ";	// used by Avatars.

	// "Search Topics" At top of page
	if(searchTopics) 
	{
		$(".board_nav").after($(".searchtopics").css('margin', '0'));
	}
	
	if(enableImages)
	{
		$('.msg_body a[href$=".gif"], .msg_body a[href$=".jpg"], .msg_body a[href$=".png"], .msg_body a[href$=".bmp"], .msg_body a[href$=".jpeg"]')
		.each(function(index, value) {
			var href = $(this).attr("href");
			var width;
			
			$(this).after(" <button id='tti-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'>" + 
							"<i class='icon icon-picture'></i></button><span id='tti-image-" + index + "'></span>");
			
			$("#tti-image-" + index).css("max-width", width);

			$("#tti-image-" + index).hide();
			
			$("#tti-" + index).click(function() {
				$("#tti-image-" + index).html("<img id='tti-image-" + index + "' src='" + href + "' alt='TTI Image' style='display:block'>");
				$("#tti-image-" + index).toggle();
				
			});
		
		});

	}
	
	// AMP on each page.
	if(enableAMP)
	{
		var ampURL = "http://www.gamefaqs.com/users/" + _USER_ + "/boards";
		if(ampURL) 
		{
			$.ajax({
				type: "POST",
				url: ampURL,
			})
			.done(function(response) 
			{
				var amp = $(response).find("#content > div > div > div > table > tbody:nth-child(3) > tr:nth-child(8) > td:nth-child(2)").text();
				$(".paginate.user > .unav").after("<li><a href='http://www.gamefaqs.com/boards/myposts.php?'>" + amp + "AMP</a></li>");
			});

		}		
	}
    
    if(enablePopular)
    {
        $(".paginate.user > .unav").after("<li><a href='http://www.gamefaqs.com/boards/popular.php?'>Popular</a></li>");
    }

	// Webm
	if(enableWebm)
	{
		$('a[href$=".webm"], a[href$=".WebM"], a[href$=".webM"], a[href$=".webM"]').each(function(index, value) 
		{
			var href = $(this).attr("href");
			
			$(this).after(" <button id='webm-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px'><i class='icon icon-play-circle'></i></button><div id='webm-image-" + 
							index + "'><video controls><source src=\"" + href + "\" type=\'video/webm; codecs=\"vp8, vorbis\"\'></video></div>");
			
			$("#webm-image-" + index).hide();
			
			$("#webm-" + index).click(function() 
			{
				$("#webm-image-" + index).toggle();
				if( $("#webm-image-" + index + " > video").is(":hidden") )
				{
					$("#webm-image-" + index + " > video").get(0).pause();
				}

			});
			
		});
	}
	
	// Gifv
	if(enableGifv)
	{
		$('a[href$=".gifv"]').each(function(index, value) 
		{
			var href = $(this).attr("href");
			
			$(this).after(" <button id='gifv-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px'><i class='icon icon-play-circle'></i></button><div id='gifv-image-" + 
							index + "'><video controls loop autoplay><source src=\"" + href.replace(".gifv", ".webm") + "\" type=\'video/webm; codecs=\"vp8, vorbis\"\'></video></div>");
			
			$("#gifv-image-" + index).hide();
			
			$("#gifv-" + index).click(function() 
			{
				$("#gifv-image-" + index).toggle();
				if( $("#gifv-image-" + index + " > video").is(":hidden") )
				{
					$("#gifv-image-" + index + " > video").get(0).pause();
				}
				else
				{
					$("#gifv-image-" + index + " > video").get(0).play();
				}

			});
			
		});
	}
	
	// Embedded Youtube
	if(enableYoutube)
	{
		var ytregex = /(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@#?&%=+\/\$_.-]*/
		$('td.msg a').each(function(i, v){
			if(ytregex.test($(this).attr('href'))) {
				var id = ytregex.exec($(this).attr('href'))[1];
				$(this).after(" <button id='yt-" + i +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-play-circle'></i></button><div id='yt-image-" + 
								i + "'><iframe width='720' height='480' src='http://www.youtube.com/embed/" + id + "' frameborder='0' allowfullscreen></iframe>");
				$("#yt-image-" + i).hide();
				$("#yt-" + i).click(function() {
					$("#yt-image-" + i).toggle();
				});
			}
		});
	}
	
	// Quote, Edit, Delete, Report... In Left of Post
	if(msgBelowLeftOfPost)
	{
		$(".msg_below").css("position", "relative");
		$(".msg_below").each(function(index){
			$(this).parent().prev().append($(this).detach());
		});

		$(".message_num").each(function(index){
			$(this).parent().append($(this).detach());
		});

		$(".edited").css("display", "block");
		$(".action_after").hide();
		$(".options").css("float", "none");
	}
	
	// Render Avatars
	if(enableAvatars === "leftLeft")
	{
		// Message Display: Left
		// Avatar Position: Left
		
		$(".msg_infobox").each(function( index )
		{
			var post_user = $(".name").eq(index).text().slice(0,-1);
			$(".msg_infobox > .user").eq(index).after("<img src='http://nostlagiasky.pw/gamefaqs-avatars/avatars/" + post_user +".png' />");
		});

	}
	// End Avatar Options
	
	// Account Switcher
	
	function asAddCallback(i)
	{
		return function()
		{

			$("#asAdd").attr("disabled", "disabled");
						
			_SETTINGS_.accounts.push( 
				{
					"name": $("#asUser-" + i).val(),
					"pass": $("#asPass-" + i).val()
				});

		
			localStorage.setItem("_SETTINGS_", JSON.stringify(_SETTINGS_));
			document.location = "/boards/user.php?settings=1#tabAccountSwitcher";
			location.reload(true);
			
		}
	}

	function asDeleteCallback(i) 
	{
		return function()
		{
			$("#asDeleteBtn-" + i).attr("disabled", "disabled");
			
			_SETTINGS_.accounts.splice((i-1), 1);
			localStorage.setItem("_SETTINGS_", JSON.stringify(_SETTINGS_));
			
			document.location = "/boards/user.php?settings=1#tabAccountSwitcher";
			location.reload(true);

		}
	}
	
	if(enableAccountSwitcher)
	{
		function loginClickHandler(i) 
		{
			return function() 
			{
				var key;
				
				$.ajax( {
					type: "GET",
					url: "/user/logout.html",
					async: false
				});			
						
				if(!key) 
				{
					$.ajax({
						type: "POST",
						url: "/",
						async: false
					}).done(function(response) {
						key = response.match(/key" value="([^"]*)"/)[1];
					});
				}
				
				var formData = "EMAILADDR=" + _SETTINGS_.accounts[i].name + "&PASSWORD=" + _SETTINGS_.accounts[i].pass + "&key=" + 
								key + "&path=http://www.gamefaqs.com/";
				
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

		$("#AccountSwitch").click(function() 
		{

			var topicForm = "<div id='AccountSwitchPanel' class='reg_dialog' style='position:fixed;left:25%;top:10%;width:50%'>" +
								"<div style='padding:10px;'><h3>Account Switcher</h3>" +
								"<p>";
			
			topicForm += "<table>";
			
			for(var i = 0; i < _SETTINGS_.accounts.length; i++) {
				topicForm += "<tr><td>" + _SETTINGS_.accounts[i].name + "</td><td><button class='btn' id='asLogin-" + i + "'>Log in</button></td></tr>";
			}
				
			topicForm += "<table>";		
								
			topicForm += "<br><button class='btn' id='AccountSwitchClose'>Close</button>" +
							"</p>" +
							"</div></div>";

			$("body").append(topicForm);
			
			for(var i = 0; i < _SETTINGS_.accounts.length; i++) 
			{
				$("#asLogin-" + i).click(loginClickHandler(i));
			}
			
			$("#AccountSwitchClose").click(function() 
			{
				$("#AccountSwitchPanel").remove();
			});

		});
		

	}
	
	var switcherBody = "<h3>Account Switcher Settings</h3>";
	switcherBody += "<p>Note: This is super dangerous. Passwords are saved unencrypted in localStorage. Please use this with caution. " +
						"<b>I have no access to your account information and am not liable for anything that may happen as a result of using this feature!</b></p>";
	
	switcherBody += "<table>";

	var accNumber= 0;
	
	for( accNumber; accNumber < _SETTINGS_.accounts.length; accNumber++) 
	{
		switcherBody += "<tr><td>Username</td><td><input id='asUser-" + (accNumber + 1) + "' style='width:100%' value=\"" + 
						_SETTINGS_.accounts[accNumber].name + "\"></td><td>Password</td><td><input type='password' id='asPass-" + 
						(accNumber + 1) + "' style='width:100%' value=\"" + _SETTINGS_.accounts[accNumber].pass + 
						"\"></td><td><button class='btn' id='asDeleteBtn-" + (accNumber + 1) + "'>Remove</button></td></tr>";
	}

	switcherBody += "<tr><td>Username</td><td><input id='asUser-" + (accNumber + 1) + "' style='width:100%' value=\"" + "" + 
					"\"></td><td>Password</td><td><input type='password' id='asPass-" + 
					(accNumber + 1) + "' style='width:100%' value=\"" + "" + "\"></td><td><button class='btn' id='asAdd'>Add</button></td></tr>";

	switcherBody += "</table>";

	// End Account Switcher
	
	// Link to the Settings Page
	$(".masthead_user").prepend("<span class='masthead_mygames_drop'><a href='/boards/user.php?settings=1'>xFAQs Settings <i class='icon icon-cog'></i>" + 
								"</a><ul class='masthead_mygames_subnav' style='width:200px;left:-1px;'><li class='masthead_mygames_subnav_item'>" + 
								"<a href='/boards/565885-blood-money/'>xFAQs Help</a></li></ul></span> ");

	
	// Renders the Settings Page.
	if((decodeURIComponent((new RegExp('[?|&]' + "settings" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) == "1") 
		&& (location.pathname == "/boards/user.php")) 
	{
		$(".span4").remove();
		$(".span8").css("width", "100%");
		

		$(".page-title").html("xFAQs Settings");
		$(".userinfo").css("border", "none");
		$(".title").remove();
		$(".head").remove();
		
		// Preparing for the UI
		$("tbody").empty();    
		
				$("tbody").append( "<div id='xfaqs-tabs'>" +
							    "<ul class='content_nav content_nav_wrap'>" +
							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#news'>News</a></li>" +
							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#settings'>General Settings</a></li>" +
							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#avatars'>GameFAQs Avatars</a></li>" +
  							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-3'>User Highlighting</a></li>" +
  							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-4'>Ignore List+</a></li>" +
  							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-5'>Rotating Signatures</a></li>" +
  							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabAccountSwitcher'>Account Switcher</a></li>" +
   							    "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-6'>About</a></li>" +
							    "</ul>" +
							   
							    "<div id='news' style='padding-top:20px'></div>" +
							   
							    "<div id='settings' style='padding-top:20px'>" +
								    "<table class='contrib'>" +
										"<tr><th colspan='2'>General Settings</th></tr>" +
										"<tr><td style='width:50%'>Popular Topics in Board Navigation</td><td><input type='checkbox' id='enablePopular'></td></tr>" +
										"<tr><td style='width:50%'>AMP in Board Navigation</td><td><input type='checkbox' id='enableAMP'></td></tr>" +
										"<tr><td style='width:50%'>\"Search Topics\" at top of topic list.</td><td><input type='checkbox' id='searchTopics'></td></tr>" +
										"<tr><td style='width:50%'>Embedded Webm</td><td><input type='checkbox' id='enableWebm'></td></tr>" +
										"<tr><td style='width:50%'>Embedded Gifv</td><td><input type='checkbox' id='enableGifv'></td></tr>" +
										"<tr><td style='width:50%'>Embedded Images</td><td><input type='checkbox' id='enableImages'></td></tr>" +
										"<tr><td style='width:50%'>Embedded Youtube</td><td><input type='checkbox' id='enableYoutube'></td></tr>" +
										"<tr><td style='width:50%'>quote, edit, ect. in Message Display Left</td><td><input type='checkbox' id='msgBelowLeftOfPost'></td></tr>" +
										"<tr><td style='width:50%'>GameFAQs Avatars</td><td>" + 
										"<select id='enableAvatars'><option value='disabled'>Disabled</option>" + 
										"<option value='leftLeft'>Left (Message Display Left)</option></select></td></tr>" +
										"<tr><td style='width:50%'>Account Switcher</td><td><input type='checkbox' id='enableAccountSwitcher'></td></tr>" +
										"<tr><td colspan='2'><input type='submit' id='updateGeneral' class='btn' value='Update xFAQs Settings'></td></tr>" +
								    "</table>" +
							    "</div>" +
							   
							   
							   "<div id='avatars' style='padding-top:20px'>" +
									"<div style='float:left; width:100px; height:100px;'><img class='avatar' src='http://www.nostlagiasky.pw/gamefaqs-avatars/avatars/" + _USER_ + ".png' alt='' ></div>" +
									"<div style='float:left; padding-left:10px'><h4>GameFAQs Avatars</h4> <ul id=settings class='paginate user' style='margin:0;padding:0;'> " +
										"<form id='submit' method='POST' enctype='multipart/form-data' > " +
										"<input class='btn' type='file' name='file' accept='image/*' id='file'> " +
										"<input class='btn btn_primary' type='button' id='submit_btn' value='Upload'> " +
										"<input style='display:none' type='text' name='dest' value='GameFAQs-Avatars'> " +
										"<input style='display:none' type='text' name='user' value='" + upload_user + "'> " +
										"<span id='server_message'>Maximum File Size: 200KB</span> " +
										"</form></div>" +
										"<div style='clear:both;padding-top:30px;'>Upload an avatar, and select upload. If your upload fails, then you will get a message telling you why.<br>\
                                        Please note: This process modifies your signature, however you should get your old signature back.<br>\
                                        If your signature is set to upload:ok it will be removed.</div>" +
							   "</div>" +
   							   //"<div id='tabs-3' style='padding-top:20px'>" + highlightBody + "</div>" +
   							   //"<div id='tabs-4' style='padding-top:20px'>" + ignoreBody + "</div>" +
   							   //"<div id='tabs-5' style='padding-top:20px'>" + sigBody + "</div>" +
   							   //"<div id='tabs-6' style='padding-top:20px'>" + aboutBody + "</div>" +
   							   "<div id='tabAccountSwitcher' style='padding-top:20px'>" + switcherBody + "</div>" +
							"</div>");


	}
	
	// More Account Switcher
	$("#asAdd").click(asAddCallback(accNumber + 1));

	for(var i = 0; i < accNumber; i++) 
	{
		$("#asDeleteBtn-" + (i + 1)).click(asDeleteCallback(i + 1));
	}
	// End More Account Switcher
		
	$(function() {
		$("#xfaqs-tabs").tabs();
	});
	
	// "Load Settings"
	$(function() {
		$("#enableAMP").prop('checked', _SETTINGS_.settings[0].enableAMP);
		$("#enablePopular").prop('checked', _SETTINGS_.settings[0].enablePopular);
		$("#searchTopics").prop('checked', _SETTINGS_.settings[0].searchTopics);
		$("#enableWebm").prop('checked', _SETTINGS_.settings[0].enableWebm);
		$("#enableGifv").prop('checked', _SETTINGS_.settings[0].enableGifv);
		$("#enableImages").prop('checked', _SETTINGS_.settings[0].enableImages);
		$("#enableYoutube").prop('checked', _SETTINGS_.settings[0].enableYoutube);
		$("#msgBelowLeftOfPost").prop('checked', _SETTINGS_.settings[0].msgBelowLeftOfPost);
		$("#enableAvatars").val(_SETTINGS_.settings[0].enableAvatars);
		$("#enableAccountSwitcher").prop('checked', _SETTINGS_.settings[0].enableAccountSwitcher);
	});

	// "Save Settings"
	$("#updateGeneral").button();
	$("#updateGeneral").click(function(event) {
		_SETTINGS_.settings[0].enableAMP = $('#enableAMP').is(":checked");
		_SETTINGS_.settings[0].enablePopular = $('#enablePopular').is(":checked");
		_SETTINGS_.settings[0].searchTopics = $('#searchTopics').is(":checked");
		_SETTINGS_.settings[0].enableWebm = $('#enableWebm').is(":checked");
		_SETTINGS_.settings[0].enableGifv = $('#enableGifv').is(":checked");
		_SETTINGS_.settings[0].enableImages = $('#enableImages').is(":checked");
		_SETTINGS_.settings[0].enableYoutube = $('#enableYoutube').is(":checked");
		_SETTINGS_.settings[0].msgBelowLeftOfPost = $('#msgBelowLeftOfPost').is(":checked");
		_SETTINGS_.settings[0].enableAvatars = $('#enableAvatars').val()
		_SETTINGS_.settings[0].enableAccountSwitcher = $('#enableAccountSwitcher').is(":checked");
		localStorage.setItem("_SETTINGS_", JSON.stringify(_SETTINGS_));
		document.location = "/boards/user.php?settings=1#settings";
		location.reload(true);
	});
	// End Settings Page

	// ajax call to load the news page
	$.ajax( {
		url: "http://nostlagiasky.pw/xfaqs/xfaqsnews.php",
		dataType: "html",
		type: "GET",
	})
	.done(function( data ) 
	{
		$("#news").html(data);
	})
	.error(function() 
	{
		$("#news").html("unable to get xfaqs news - your ISP could be blacklisting nostlagiasky.pw");
	});

	// Remove any broken images at the end.
	$('img').error(function () {
		$(this).hide();
	});
	
	// Avatars stuff
	$("#file").change(function() {
		var file = this.files[0];
		var size = file.size;
		var type = file.type;
		
		if( !type.match(/image.*/) ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Invalid File Type");
			return;		
		}
		
		if( size > 204800 ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Image is too big (" + size/1024 + "KB). 200KB maximum.");
			return;
		}
		
		if( !_USER_ ) {
			$("#submit_btn").css("display", "none");
			$("#server_message").html("Log in to upload avatars.");
		}
		
		$("#submit_btn").css("display", "inline");
		$("#server_message").html("OK");
	});
	
	// ajax request that handles the upload.
	// For the love of god do not modify this. Bad things will happen.

	$("#submit_btn").click( function() {
		var formData = new FormData($('#submit')[0]);

		$("#server_message").html("backing up signature...");

		$.ajax
		({
			type: "POST",
			url: "/boards/sigquote.php",
			async: false,
		})
		.done(function(response) 
		{
			var sig = $(response).find("#sig").text();
			var quote = $(response).find("#quote").text();
			var key = $(response).find("input[name=key]").eq(0).attr("value");
			var sigpost = $(response).find("#add").attr("action");
			//console.log(sig);
			//console.log(key);
			//console.log(sigpost);


			if((sig == "upload:ok") || (sig == "avatarupload:true"))
			{
				// replace old signature
				sig = "";
			}

			$("#server_message").html("Sending permission to change sig");

			$.ajax
			({
				type: "POST",
				url: sigpost,
				data: "key=" + key + "&sig=" + "avatarupload:true" + "&quote=" + quote + "&submit=Change Settings",
			})
			.done(function(response) 
			{
				$("#server_message").html("Uploading...");
				$.ajax( {
					url: "http://www.nostlagiasky.pw/gamefaqs-avatars/upload-v2.php",
					dataType: "html",
					type: "POST",
					data: formData,
					processData: false,
					contentType: false,
					async: false
				}).done(function( data ) {
					if( data == 'Upload Successful! Refreshing to apply changes...') 
					{
						$.ajax
						({
							type: "POST",
							url: sigpost,
							data: "key=" + key + "&sig=" + sig + "&quote=" + quote + "&submit=Change Settings",
						})
						.done(function(response) 
						{
							//console.log("Sig changed back.");
							$("#server_message").html(data);
							location.href = "http://www.gamefaqs.com/boards/user.php?settings=1#tabs-2";
							location.reload(true);
						});
					}
					else 
					{
						$.ajax
						({
							type: "POST",
							url: sigpost,
							data: "key=" + key + "&sig=" + sig + "&quote=" + quote + "&submit=Change Settings",
						}).done(function(response) 
						{
							//console.log("Sig changed back.");
						});
						$("#server_message").html(data);
					}
				}).error(function() {
					$.ajax
					({
						type: "POST",
						url: sigpost,
						data: "key=" + key + "&sig=" + sig + "&quote=" + quote + "&submit=Change Settings",
					})
					.done(function(response) 
					{
						//console.log("Sig changed back.");
					});
					$("#server_message").html("Avatar not uploaded to nostlagiasky domain. Service may be unavailable.");
				});
			});
		});
	});
	// End Avatars Stuff


}
else
{
	alert("jQuery is Required to use xFAQs-Next.");
}