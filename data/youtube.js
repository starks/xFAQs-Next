if(typeof(Storage)!=="undefined") {
	var enableWebm = localStorage.getItem("enableWebm");
	
} else {
	var enableWebm;
}

if (enableWebm === "type-2") {

	var ytregex = /(?:http|https|)(?::\/\/|)(?:www.|)(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/ytscreeningroom\?v=|\/feeds\/api\/videos\/|\/user\S*[^\w\-\s]|\S*[^\w\-\s]))([\w\-]{11})[a-z0-9;:@#?&%=+\/\$_.-]*/
	

	$('td.msg a').each(function(i, v){
		if(ytregex.test($(this).attr('href'))) {
			var id = ytregex.exec($(this).attr('href'))[1];
			$(this).after(" <button id='yt-" + i +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-play-circle'></i></button><div id='yt-image-" + i + "'><iframe width='720' height='480' src='http://www.youtube.com/embed/" + id + "' frameborder='0' allowfullscreen></iframe>");
			$("#yt-image-" + i).hide();
			$("#yt-" + i).click(function() {
				$("#yt-image-" + i).toggle();
			});
		}
	});
	
	if (sigTTI === "checked") {
		$('.sig a').each(function(i, v){
			if(ytregex.test($(this).attr('href'))) {
				var id = ytregex.exec($(this).attr('href'))[1];
				$(this).after(" <button id='syt-" + i +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-play-circle'></i></button><div id='syt-image-" + i + "'><iframe width='720' height='480' src='http://www.youtube.com/embed/" + id + "' frameborder='0' allowfullscreen></iframe>");
				$("#syt-image-" + i).hide();
				$("#syt-" + i).click(function() {
					$("#syt-image-" + i).toggle();
				});
			}
		});
	}

	// https://www.youtube.com/watch?v=4m1XVbGaolg
	// <iframe width="560" height="315" src="//www.youtube.com/embed/4m1XVbGaolg" frameborder="0" allowfullscreen></iframe>
	
}