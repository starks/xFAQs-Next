/****************************************************************************
* Please Note: The URL parsing on this is not 100%. Some characters         *
* (namely ()'s) will not parse.												*
****************************************************************************/
if(typeof(Storage)!=="undefined") {
	var enableWebm = localStorage.getItem("enableWebm");
	
} else {
	var enableWebm;
}


if (enableWebm === "type-1") {
	$('td.msg').each(function() {
			var text = $(this).html();
			var regex = /http:\/\/[^"]*\.webm|https:\/\/[^"]*\.webm/g;
			var	matches = regex.exec(text);				
			
			while(matches = regex.exec(text)) {
				var text = $(this).html();
				if ( matches !== null) {
					if ( matches !== null) {
						if( matches !== undefined) {
							console.log(matches);
							var video_regex = new RegExp('<a href="' + matches + '">' + matches + '<\/a>');
							
							console.log(video_regex);
						
							$(this).html(text.replace(video_regex, '<video width=\"720\" height=\"480\" controls ><source src=\"' + matches[0] + '\" type=\'video/webm; codecs=\"vp8, vorbis\"\'></video>'));
						}
					}

				}
			}
			
			
			
	});
}

if (enableWebm === "type-2") {

	$('a[href$=".webm"], a[href$=".WebM"], a[href$=".webM"], a[href$=".webM"], a[href$=".gifv"]').each(function(index, value) {
		var href = $(this).attr("href");
		
		$(this).after(" <button id='webm-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px'><i class='icon icon-play-circle'></i></button><div id='webm-image-" + index + "'><video controls loop><source src=\"" + href.replace(".gifv", ".webm") + "\" type=\'video/webm; codecs=\"vp8, vorbis\"\'></video></div>");
		
		$("#webm-image-" + index).hide();
		
		$("#webm-" + index).click(function() {
			$("#webm-image-" + index).toggle();
		});
		
	});
}