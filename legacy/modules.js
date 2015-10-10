// modules.js
// Has a lot of small modules that were either not extracted out to their own files or
// are too small for their own file.


// VERSION 1.9: 2015-04-22:
//  - REMOVED Sig Split
//  - REMOVED "Removable TTI in Signatures"
//  - FIXED Ignore List+
//  - REMOVED Misleading Tags.
// VERSION 2.2.0: 2015-05-27
//  - ??? I cannot remember every change I had. Wish I had Surround to manage this.
//  - Added Nav back in but kept TinyNav for now.
//  - Need to go look through options and remove broken stuff at a later date.

function txtTagEdit(tag) {
	var msgAreaEdit = document.getElementsByName('messagetext')[0];
	var currTag = document.getElementsByName(tag)[0];
	var tagStart = "<"+tag+">";
	var tagEnd = "</"+tag+">";
	var c = msgAreaEdit.selectionStart;
	var selPre = msgAreaEdit.value.substr(0,c);
	var selPost = msgAreaEdit.value.substr(msgAreaEdit.selectionEnd);
	var selTxt;

	if(c!=undefined)
	{
		selTxt = msgAreaEdit.value.substr(c,msgAreaEdit.selectionEnd-c);
	}
	if(selTxt.length<1)
	{
		if(currTag.className.indexOf('active')>0)
		{
			msgAreaEdit.value = [msgAreaEdit.value.slice(0,c),tagEnd,msgAreaEdit.value.slice(c)].join('');
			var rm = currTag.className.indexOf(' active');
			var p = c+tagEnd.length;
			currTag.className = currTag.className.substr(0,rm);
			currTag.style.color = '#000';
			setPos(msgAreaEdit,p);
		}
		else
		{
			msgAreaEdit.value = [msgAreaEdit.value.slice(0,c),tagStart,msgAreaEdit.value.slice(c)].join('');
			var p = c+tagStart.length;
			currTag.className += " active";
			currTag.style.color = '#6564ff';
			setPos(msgAreaEdit,p);
		}
	}
	else
	{
		msgAreaEdit.value = selPre+tagStart+selTxt+tagEnd+selPost;
		var p = c+tagStart.length+selTxt.length+tagEnd.length;
		setPos(msgAreaEdit,p);
	}
}



if(typeof(Storage)!=="undefined") {
	var storage = localStorage.getItem("avatar");
	var enableWebm = localStorage.getItem("enableWebm");
	var enableCode = localStorage.getItem("enableCode");
	var enableQuickEdit = localStorage.getItem("enableQuickEdit");
	var enableAvatars = localStorage.getItem("enableAvatars");
	var enableHighlight = localStorage.getItem("enableHighlight");
	var searchTopics = localStorage.getItem("searchTopics");
	var removeSig = localStorage.getItem("removeSig");
	
} else {
	var storage = "left";
	var enableWebm;
	var enableCode;
	var enableQuickEdit;
	var enableAvatars;
	var searchTopics;
	var enableHighlight;
	var removeSig;

}

var formatter = '<span class="tagbuttons"> \
					<input type="button"  value="Bold" class="btn btn_mini btnbold" name="b" tabindex="-1"> \
					<input type="button"  value="Italic" class="btn btn_mini btnitalic" name="i" tabindex="-1"> \
					<input type="button"  value="Spoiler" class="btn btn_mini" name="spoiler" tabindex="-1"> \
					<input type="button"  value="Cite" class="btn btn_mini btncite" name="cite" tabindex="-1"> \
					<input type="button"  value="Quote" class="btn btn_mini" name="quote" tabindex="-1"> \
					<input type="button"  value="Code" class="btn btn_mini btncode" name="code" tabindex="-1"> \
				</span>';


if($(".tagbuttons").size()) 
{
	$(".tagbuttons").html(formatter);
	$('[name="b"]').click(function() {txtTagEdit('b');});
	$('[name="i"]').click(function() {txtTagEdit('i');});
	$('[name="spoiler"]').click(function() {txtTagEdit('spoiler');});
	$('[name="cite"]').click(function() {txtTagEdit('cite');});
	$('[name="quote"]').click(function() {txtTagEdit('quote');});
	$('[name="code"]').click(function() {txtTagEdit('code');});
	$('[name="strike"]').click(function() {txtTagEdit('strike');});

}
	

$(".msg_body").css("margin-bottom", "10px");

var crumbsize = $(".crumb a").size();

if(crumbsize == 4) 
{

    var boardlist = $(".crumb a").eq(1).attr("href");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");


    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
}

else if(crumbsize == 7 && ($("ol.crumbs").eq(0).children().length == 3)) 
{

    var boardlist = $(".crumb a").eq(4).attr("href");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");


    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
}
else if(crumbsize == 7 && ($("ol.crumbs").eq(0).children().length == 5)) 
{

    var boardlist = $(".crumb a").eq(4).attr("href");
    //$(".paginate.user").eq(0).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");


    //$(".paginate.user").eq(1).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
}
else if(crumbsize == 9) 
{

    var boardlist = $(".crumb a").eq(6).attr("href");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");


    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='" + boardlist + "'>Topic List</a></li>");
    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
}
else
{
    $(".paginate.user").eq(0).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
    $(".paginate.user").eq(1).children().eq(0).after("<li><a href='/boards'>Board List</a></li>");
}

		
////!!!!!!!!!!!!!!!!!!
//$(".tinynav").hide();
		
// $(".msg_body").css("minHeight", "100px");		
			
// strike and code tags
/*$('.msg_body').each(function(){
    $(this).html($(this).html()
		.split('&lt;strike&gt;').join('<strike>').split('&lt;/strike&gt;').join('</strike>')
		.split('&lt;code&gt;').join('<code>').split('&lt;/code&gt;').join('</code>')
		.split('&lt;cite&gt;').join('<cite>').split('&lt;/cite&gt;').join('</cite>')
		.split('&lt;spoiler&gt;').join('<s>').split('&lt;/spoiler&gt;').join('</s>')
		.split('&lt;quote&gt;').join('<blockquote>').split('&lt;/quote&gt;').join('</blockquote>')
		.split('&lt;u&gt;').join('<u>').split('&lt;/u&gt;').join('</u>')
		.split('&lt;qt&gt;').join('<blockquote>').split('&lt;/qt&gt;').join('</blockquote>'));
});*/

// sigs
// This code is depricated. Don't enable it unless you want things broken.
//for( var i = 0; i < $("td.msg").size(); i++)
//  $("td.msg").eq(i).html($("td.msg").eq(i).html().replace(/(.*)<br>---<br>/, "$1</div><div class='sig'>---<br>"));


// sig remover
//if(removeSig === "checked") {
//	$(".sig").hide();
//}

if(searchTopics == "checked") {
	$(".board_nav").prepend($(".searchtopics").css("margin", "0"));
}


// Highlighting
// I should really put this in its own file
// Currently only works with V13 and V12.
if(typeof(Storage)!=="undefined") {
	var enableHighlight = localStorage.getItem("enableHighlight");
	var tcColor = localStorage.getItem("tcColor");
	var adminColor = localStorage.getItem("adminColor");
	var modColor = localStorage.getItem("modColor");
	var vipColor = localStorage.getItem("vipColor");
	
} else {
	var enableHighlight;
}


if (enableHighlight === "checked") {
	var highlightList = JSON.parse(localStorage.getItem("highlightList"));

	var msgCount = $("td.msg").length;
	var topicCount = $(".tauthor").length;

	for( var i = 0; i < msgCount; i++) {

		if($("span.author_data:nth-child(1)").eq(i).text() === "#1") {
			$("td.author").eq(i).css("background-color", tcColor);	
			//$("td.msg").eq(i).css("background-color", tcColor);	
		}				

		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Topic Creator)") {
			$("td.author").eq(i).css("background-color", tcColor);	
			//$("td.msg").eq(i).css("background-color", tcColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(VIP)") {
			$("td.author").eq(i).css("background-color", vipColor);	
			//$("td.msg").eq(i).css("background-color", vipColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Moderator)") {
			$("td.author").eq(i).css("background-color", modColor);	
			//$("td.msg").eq(i).css("background-color", modColor);	
		}
		
		if($("span.author_data:nth-child(3)").eq(i).text() === "(Admin)") {
			$("td.author").eq(i).css("background-color", adminColor);	
			//$("td.msg").eq(i).css("background-color", adminColor);	
		}
		
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] === $(".name").eq(i).text()) {
					$("span.author_data:nth-child(2)").eq(i).after("<span class='author_data'>" + highlightList.groups[j].groupName + "</span>");	
					$("td.author").eq(i).css("background-color", highlightList.groups[j].color);	
					//$("td.msg").eq(i).css("background-color", highlightList.groups[j].color);	
				}
				
			}
		}

	}
	
	for( var i = 0; i < topicCount; i++) {
		for( var j = 0; j < highlightList.groups.length; j++) {
			for(var k = 0; k < highlightList.groups[j].userNames.length; k++) {
				if( highlightList.groups[j].userNames[k] == $(".tauthor").eq(i).text()) {
					$(".tauthor").eq(i).css("background-color", highlightList.groups[j].color);	
				}				
			}
		}
	}
	
	
	
}

// Highlighting






// Ignore+

if(typeof(Storage)!=="undefined") {
	var enableIgnore = localStorage.getItem("enableIgnore");
	
} else {
	var enableIgnore;
}

if (enableIgnore === "checked") {
	var user = $(".welcome").text().slice(0, -1);
	var ignoreList = JSON.parse(localStorage.getItem("ignoreList"));

	function editCallback(i) {
		return function() {
			ignoreList.users.push($(".name").eq(i-1).text());
			localStorage.setItem("ignoreList", JSON.stringify(ignoreList));
			location.reload(true);
		}
	}



	var msgCount = $("td.msg").length;

	for( var i = 0; i < msgCount; i++) {
		for( var j = 0; j < ignoreList.users.length; j++ ) {
			if( $(".name").eq(i).text() == ignoreList.users[j] ) {			
				$("tr.msg").eq(i).css("display", "none");		
			}		
		}
		
		if( $(".name").eq(i).text() !== user ) 
        {
            if($(".msg_stats_left").size() !== 0) 
            {
				$("a.qq").eq(i).after(" - <a class='ignore' id='ignore-" + (i+1) + "'>ignore</a> ");
            }
            else
            {
				$("a.qq").eq(i).after(" | <a class='ignore' id='ignore-" + (i+1) + "'>ignore</a> ");
            }
            $("#ignore-" + (i+1)).click(editCallback(i+1));
		}
	}
	
	var topicCount = $("tr.topics").length;
	
    if($(".top").size() == 0)
    {
    	for( var i = 0; i < topicCount; i++) {
    		for( var j = 0; j < ignoreList.users.length; j++ ) {
                if( $("td.tauthor").eq(i).text() == ignoreList.users[j] )
                {
                    $("tr.topics").eq(i).css("display", "none");		
                }		
            }
        }
    }
    else
    {

        for( var j = 0; j < ignoreList.users.length; j++ ) {
            $(".name").each(function()
            {
                if($(this).text() == ignoreList.users[j]) 
                {
                    $(this).closest(".top").toggle();
                    $(this).closest(".top").next().toggle();
                }
            });
        }

    }	

}

// Ignore+
