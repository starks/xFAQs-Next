// Note: Filters only work on retro skins if "Message Poster Display" Above Message is enabled in
// http://www.gamefaqs.com/user/options_advanced.html

// VERSION 1.9: 2015-04-22:
//  FIXED: Filtering

if(enableFilter == "checked") {
	function filterCallback(user) {
		return function() {
            if($(".top").size() == 0)
            {
                $(".name:not(:contains('" + user + "'))").closest(".msg").toggle();
            }
            else
            {
                $(".name:not(:contains('" + user + "'))").closest(".top").toggle();
                $(".name:not(:contains('" + user + "'))").closest(".top").next().toggle();
            }

		}

	}
	
	var msgCount = $("td.msg").length;

	for( var i = 0; i < msgCount; i++) {
		var user = $(".name").eq(i).text();
		if($(".msg_stats_left").size() !== 0) {
			$("a.qq").eq(i).after(" - <a href='#' class='filter-" + i + "'>filter</a>");
		} else {
			$("a.qq").eq(i).after(" | <a href='#' class='filter-" + i + "'>filter</a>");
		}
		
		$(".filter-" + i).click(filterCallback(user));
		
	}
	
}