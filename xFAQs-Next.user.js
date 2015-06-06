// ==UserScript==
// @name         xFAQs-Next
// @namespace    xfaqs
// @version      0.0.3
// @description  xFAQs For the New Message Board Beta
// @author       @Kraust / Judgmenl
// @match        *.gamefaqs.com/*
// @grant        none
// ==/UserScript==

// http://www.nostlagiasky.pw
// https://github.com/Kraust/xFAQs-Next

// TODOs:
// 1. Settings JSON - Partial
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
		var disableTinyNav = _SETTINGS_.settings[0].disableTinyNav;
		var searchTopics = _SETTINGS_.settings[0].searchTopics;

	} else 
	{
		var _SETTINGS_ =
		{ 	
			"settings": [
				{
					"enableAMP": false,
					"disableTinyNav": false,
					"searchTopics": false
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
		var disableTinyNav = _SETTINGS_.settings[0].disableTinyNav;
		var searchTopics = _SETTINGS_.settings[0].searchTopics;

	}
	
	// The "MASTER" user variable should be used in any case where you want the user's name.
	// I forget how to get the "accurate" Username... There are a few ways to get it. Going to use the welcome class for now.
	// This may be the incompatible one.
	var _USER_ = $(".welcome").text().slice(0, - 1).replace(/ /g,"_");
	var upload_user = _USER_ + " ";	// used by Avatars.

	// "Search Topics" At top of page
	if(searchTopics) {
		$(".board_nav").after($(".searchtopics").css('margin', '0'));
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
	
	// Disable TinyNav
	if(disableTinyNav)
	{
		$(".tinynav").hide();
	}

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
							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-2'>Avatar Settings</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-3'>User Highlighting</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-4'>Ignore List+</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-5'>Rotating Signatures</a></li>" +
  							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-7'>Account Switcher</a></li>" +
   							   "<li class='cnav_item' style='border-radius: 5px; cursor: pointer;'><a href='#tabs-6'>About</a></li>" +
							   "</ul>" +
							   
							   "<div id='news' style='padding-top:20px'></div>" +
							   
							   "<div id='settings' style='padding-top:20px'>" +
								   "<table class='contrib'>" +
									   "<tr><th colspan='2'>General Settings</th></tr>" +
									   "<tr><td style='width:50%'>AMP in Board Navigation</td><td><input type='checkbox' id='enableAMP'></td></tr>" +
									   "<tr><td style='width:50%'>Hide Tiny Navigation (Breadcrumbs)</td><td><input type='checkbox' id='disableTinyNav'></td></tr>" +
									   "<tr><td style='width:50%'>\"Search Topics\" at top of topic list.</td><td><input type='checkbox' id='searchTopics'></td></tr>" +
									   "<tr><td colspan='2'><input type='submit' id='updateGeneral' class='btn' value='Update xFAQs Settings'></td></tr>" +
								   "</table>" +
							   "</div>" +
							   
							   
							   /*"<div id='tabs-2' style='padding-top:20px'>" +
									
									"<div style='float:left; width:100px; height:100px;'><img class='avatar' src='http://www." + avatarDomain + "/gamefaqs-avatars/avatars/" + user + ".png' alt='' ></div>" +
									"<div style='float:left; padding-left:10px'><h4>Global Avatar Settings</h4> <ul id=settings class='paginate user' style='margin:0;padding:0;'> \
										<li><a id='av_left'>Avatars to the Left</a></li><li><a id='av_right'>Avatars to the Right</a></li><li><a id='av_no'>No Avatars</a></li><li><a id='av_remove'>Remove Avatar</a></li></ul> \
										<form id='submit' method='POST' enctype='multipart/form-data' > \
										<input class='btn' type='file' name='file' accept='image/*' id='file'> \
										<input class='btn btn_primary' type='button' id='submit_btn' value='Upload'> \
										<input style='display:none' type='text' name='dest' value='GameFAQs-Avatars'> \
										<input style='display:none' type='text' name='user' value='" + upload_user + "'> \
										<span id='server_message'>Maximum File Size: 200KB</span> \
										</form></div>" +
										
										"<div style='clear:both;padding-top:30px;'>Upload an avatar, and select upload. If your upload fails, then you will get a message telling you why.<br>\
                                        Please note: This process modifies your signature, however you should get your old signature back.<br>\
                                        If your signature is set to upload:ok it will be removed.</div>" +
											
							   "</div>" +*/
   							   //"<div id='tabs-3' style='padding-top:20px'>" + highlightBody + "</div>" +
   							   //"<div id='tabs-4' style='padding-top:20px'>" + ignoreBody + "</div>" +
   							   //"<div id='tabs-5' style='padding-top:20px'>" + sigBody + "</div>" +
   							   //"<div id='tabs-6' style='padding-top:20px'>" + aboutBody + "</div>" +
   							   //"<div id='tabs-7' style='padding-top:20px'>" + switcherBody + "</div>" +
							"</div>");


	}
	$(function() {
		$("#xfaqs-tabs").tabs();
	});
	
	// "Load Settings"
	$(function() {
		$("#enableAMP").prop('checked', _SETTINGS_.settings[0].enableAMP);
		$("#disableTinyNav").prop('checked', _SETTINGS_.settings[0].disableTinyNav);
		$("#searchTopics").prop('checked', _SETTINGS_.settings[0].searchTopics);
	});

	// "Save Settings"
	$("#updateGeneral").button();
	$("#updateGeneral").click(function(event) {
		_SETTINGS_.settings[0].enableAMP = $('#enableAMP').is(":checked");
		_SETTINGS_.settings[0].disableTinyNav = $('#disableTinyNav').is(":checked");
		_SETTINGS_.settings[0].searchTopics = $('#searchTopics').is(":checked");
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

}
else
{
	alert("jQuery is Required to use xFAQs-Next.");
}