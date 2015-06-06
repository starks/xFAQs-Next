if(typeof(Storage)!=="undefined") {
	var enableTracked = localStorage.getItem("enableTracked");
	
} else {
	var enableTracked;
}

if(enableTracked == "checked") {

	$(".paginate.user > li ").eq(2).after("<li><a href='http://www.gamefaqs.com/boards/tracked'>Tracked Topics</a></li>");

	
}