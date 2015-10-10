/****************************************************************************
* Please Note: The URL parsing on this is not 100%. Some characters         *
* (namely ()'s) will not parse.												*
****************************************************************************/

// VERSION 1.9: 2015-04-22:
//  - REMOVED: Sig Split Code
//  - FIXED: Images will not load unless you toggle them.

// sigTTI is currently disabled.

if(typeof(Storage)!=="undefined") {
	var enableTTI = localStorage.getItem("enableTTI");
	var maxWidth = localStorage.getItem("maxWidth");
	var maxHeight = localStorage.getItem("maxHeight");
	
} else {
	var enableTTI;
	var maxWidth;
	var maxHeight;
}


if (enableTTI === "type-1") {
	$('td.msg').each(function() {
			var text = $(this).html();
			var regex = /http:\/\/[^"]*\.png|https:\/\/[^"]*\.png|http:\/\/[^"]*\.jpg|https:\/\/[^"]*\.jpg|http:\/\/[^"]*\.gif|https:\/\/[^"]*\.gif/g;
			var	matches = regex.exec(text);				
			
			while(matches = regex.exec(text)) {
				var text = $(this).html();
				if ( matches !== null) {
					if ( matches !== null) {
						if( matches !== undefined) {
							console.log(matches);
							var video_regex = new RegExp('<a href="' + matches + '">' + matches + '<\/a>');
							
							console.log(video_regex);
						
							var result = matches[0];

						
							$(this).html(text.replace(video_regex, "<a target='_blank' href='" + result + "'><img src='"+ result + "' alt='Broken TTI Image' style='max-height:" + maxHeight + "px;max-width:" + maxWidth + "px;'></a>"));
						}
					}

				}

			}
			
			
			
	});
}

if (enableTTI === "type-2") {

	$('.msg_body a[href$=".gif"], .msg_body a[href$=".jpg"], .msg_body a[href$=".png"], .msg_body a[href$=".bmp"], .msg_body a[href$=".jpeg"]').each(function(index, value) {
		var href = $(this).attr("href");
		var width;
        
		if (storage == "right" ) 
		{
		    width = $('.msg_body').width() - 150;
		}
		else
		{
            width = $('.msg_body').width();
		}
		
		$(this).after(" <button id='tti-" + index +"' class='btn' style='padding-left:3px;padding-right:3px;padding-top:1px;padding-bottom:1px;'><i class='icon icon-picture'></i></button><span id='tti-image-" + index + "'></span>");
		
		$("#tti-image-" + index).css("max-width", width);

		$("#tti-image-" + index).hide();
		
		$("#tti-" + index).click(function() {
            $("#tti-image-" + index).html("<img id='tti-image-" + index + "' src='" + href + "' alt='TTI Image' style='display:block'>");
			$("#tti-image-" + index).toggle();
			
		});
		
	});
	
}

$('img').error(function () {
    $(this).remove;
});