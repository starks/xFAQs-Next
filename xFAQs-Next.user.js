// ==UserScript==
// @name         xFAQs-Next
// @namespace    xfaqs
// @version      0.0.1
// @description  xFAQs For the New Message Board Beta
// @author       @Kraust / Judgmenl
// @match        *.gamefaqs.com/*
// @grant        none
// ==/UserScript==

// http://www.nostlagiasky.pw
// https://github.com/Kraust/xFAQs-Next

// TODOs:
// 1. Settings JSON
// 3. Get the "MASTER" User Variable to work in all cases
// 2. Settings Page (In the same Style as xfaqs does now)


// Note: jQuery is provided by GameFAQs by default. I will be using it a lot in this code.
if(jQuery) 
{
	// The "MASTER" user variable should be used in any case where you want the user's name.
	// I forget how to get the "accurate" Username... There are a few ways to get it. Going to use the welcome class for now.
	// This may be the incompatible one.
	var _USER_ = $(".welcome").text().slice(0, - 1).replace(/ /g,"_");
	var enableAMP = true; // TODO: Add JSON Settings
	
	// TEST: AMP on each page.
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
				$(".paginate.user > li ").eq(0).after("<li><a href='http://www.gamefaqs.com/boards/myposts.php?'>" + amp + "AMP</a></li>");
			});

		}		
	}


}
else
{
	alert("jQuery is Required to use xFAQs-Next.");
}