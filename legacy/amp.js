if(typeof(Storage)!=="undefined") {
	var enableAMP = localStorage.getItem("enableAMP");
	
} else {
	var enableAMP;
}

if(enableAMP == "checked") {

	var user = $(".welcome").text().slice(0, - 1).replace(/ /g,"_");
	var ampURL = "http://www.gamefaqs.com/users/" + user + "/boards";

	if(ampURL) {

		$.ajax({
			type: "POST",
			url: ampURL,
		}).done(function(response) {
			var amp = $(response).find("#content > div > div > div > table > tbody:nth-child(3) > tr:nth-child(8) > td:nth-child(2)").text();
			$(".paginate.user > li ").eq(0).after("<li><a href='http://www.gamefaqs.com/boards/myposts.php?'>" + amp + "AMP</a></li>");
		});

	}
	
}