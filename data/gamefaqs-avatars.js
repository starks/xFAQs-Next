
/*
	Modified for xFAQs
*/

// VERSION 2.2.0: 2015-05-27
// - Fixed for "New Message Board Beta".

/****************************************************************************
 * Disclaimer: This product is given as is, and anyone who many want to use *
 * It is free to with my permission. If you need to contact me for any      *
 * reason please send me a message over on GameFAQs. I've tried to make it  *
 * so that in later versions of the script that people with a jQuery        *
 * background can understand what's going on here.                          *
 ****************************************************************************/
 
/****************************************************************************
 * As of 2.5.4 I'm working on re-writing a lot of this code                 *
 * due to a lot of suggestions on Blood Money.								*
 * Thanks to OTACON120, P4wn4g3, and Corrupt_Power 							*
 ****************************************************************************/


// Avatar Domain selector
// avatarDomain { nostlagiasky.pw | cs.uml.edu/~rdupuis }
var avatarDomain;

if(localStorage.avatarDomain != null) {
	avatarDomain = localStorage.avatarDomain;
} else {
	avatarDomain = "nostlagiasky.pw";
	localStorage.setItem("avatarDomain", "nostlagiasky.pw");	
}

//

//
 
if (enableAvatars === "checked") {

	if((decodeURIComponent((new RegExp('[?|&]' + "upload" + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) == "1") && (location.pathname == "/boards/user.php")) {


		// This block is for http://www.gamefaqs.com/boards/user.php?upload=1 Note the upload=1.
		
		var user = $("html.js body.wf-active div.wrapper div#mantle_skin div#content.container div.main_content div.span8 div.body table.board tbody tr td").eq(0).text();
		
		// GameWeasel Fix
		if( user == "") {
			var user = $("#content > div > div > div.body > table > tbody > tr:nth-child(1) > td").text();
		}
		console.log(user);
		
		
		var upload_user = user + " ";

		$(".page-title").html("GameFAQs Avatars");
		$(".userinfo").css("border", "none");
		
		// Preparing for the Upload UI
		$("tbody").empty();    
			
		// Renders the Upload UI	
		if( user ) {
			$("tbody").append("<div style='float:left; width:100px; height:100px;'><img class='avatar' src='http://www." + avatarDomain + "/gamefaqs-avatars/avatars/" + user + ".png' alt='' ></div>" );
			$("tbody").append("<div style='float:left; padding-left:10px'><h4>Global Avatar Settings</h4> <ul id=settings class='paginate user' style='margin:0;padding:0;'> \
					<li><a href='' id='av_left'>Avatars to the Left</a></li><li><a href='' id='av_right'>Avatars to the Right</a></li><li><a href='' id='av_no'>No Avatars</a></li></ul> \
					<form id='submit' method='POST' enctype='multipart/form-data' > \
					<input class='btn' type='file' name='file' accept='image/*' id='file'> \
					<input class='btn btn_primary' type='button' id='submit_btn' value='Upload'> \
					<input style='display:none' type='text' name='dest' value='GameFAQs-Avatars'> \
					<input style='display:none' type='text' name='user' value='" + user + " '> \
					<span id='server_message'>Maximum File Size: 100KB</span> \
					</form></div>");
				
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'>Before uploading an avatar, you must change your Signature to upload:ok (<a href='http://puu.sh/9yTZJ/3acde356e0.png' target='_blank'>Example</a>). \
								You can do that on <a href='http://www.gamefaqs.com/boards/sigquote.php' target='_blank'>this</a> page. You can change your signature back after the avatar is uploaded.");
			

			// Update Notes are down here.
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'><h4>Version 2.5.4</h4>+ Refactored a lot of code due to user Input<br> + New Design for people who use avatars to the left and message post display above.</div>");

			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:30px;'><a href='http://www.nostlagiasky.pw/gamefaqs-avatars/' target='_blank'>GameFAQs Avatars</a> created by <a href='http://www.gamefaqs.com/users/Judgmenl/boards'>Judgmenl</a> - 2014.</div>");
			$("tbody").append("<div style='clear:both;padding-left:10px;padding-top:0px;'>A listing of avatars can be located <a href='http://www.nostlagiasky.pw/gamefaqs-avatars/avatars/' target='_blank'>here</a>.</div>");

		}
		
		
		/* error checking when handling the upload */	

		$("#file").change(function() {
		
			var file = this.files[0];
			var size = file.size;
			var type = file.type;
			
			if( !type.match(/image.*/) ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Invalid File Type");
				return;		
			}
			
			if( size > 102400 ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Image is too big (" + size/1024 + "KB). 100KB maximum.");
				return;
			}
			
			if( !user ) {
				$("#submit_btn").css("display", "none");
				$("#server_message").html("Log in to upload avatars.");
			}
			
			$("#submit_btn").css("display", "inline");
			$("#server_message").html("OK");
		
			

		});
		
		/* ajax request to handle the upload */

		$("#submit_btn").click( function() {
		
		
		
			var formData = new FormData($('#submit')[0]);
		
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
				if( data == 'Upload Successful! Refreshing to apply changes...') {
					$("#server_message").html("[1/2] Upload Successful!");
				} else {
					$("#server_message").html(data);
				}
			}).error(function() {
				$("#server_message").html("[1/2] ERROR: Avatar not uploaded to nostlagiasky domain.");
			});
			
			$.ajax( {
				url: "http://weblab.cs.uml.edu/~rdupuis/gamefaqs-avatars/upload-v2.php",
				dataType: "html",
				type: "POST",
				data: formData,
				processData: false,
				contentType: false,
				async: false
			}).done(function( data ) {
				if( data == 'Upload Successful! Refreshing to apply changes...') {
					$("#server_message").html("[2/2] Upload Successful! Refreshing to apply changes...");
					location.reload(true);
				} else {				
					$("#server_message").html(data);
					location.reload(true);
				}
			}).error(function() {
				$("#server_message").html("[2/2] ERROR: Avatar not uploaded to weblab domain. Refreshing to apply changes...");
				location.reload(true);

			});

			
		});
		
		
		/* storage setters */
		$("#av_left").click( function() {
			localStorage.setItem("avatar", "left");
		});
		
		$("#av_right").click( function() {
			localStorage.setItem("avatar", "right");
		});
		
		$("#av_no").click( function() {
			localStorage.setItem("avatar", "no");
		});


	} else 	if((window.location.pathname.indexOf("\/users\/") > -1) && window.location.pathname.indexOf("\/boards") > -1) {	

		// This block is for http://www.gamefaqs.com/users/<username>/boards
		// It handles the avatars in profiles code.

		var userName = $("#content > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)").text();

		$(".span4 > .body").prepend(" \
			<div class='pod'> \
				<div class='head'><h2 class='title'>" + userName + "'s Avatar</h2></div> \
					<div class='body'> \
						<div class='details'> \
							<img src='http://www." + avatarDomain + "/gamefaqs-avatars/avatars/" + userName + ".png' alt=''> \
						</div> \
					</div> \
				<div class='foot'></div> \
			</div>");
			
		$('img').error(function() {
			$(this).remove(); 
		});
		
	} else {

		// This is what renders the avatars on a post by post basis.
				
		var msgCount = $("td.msg").length;

		if ( storage == "no" ) {
			// no avatars.					
		} else if (storage == "right" ) {		

            $(".msg_body").css("margin-right", "115px");
            $(".msg_infobox").css("clear", "both");
            $(".msg_below").css("clear", "both");
			$(".msg_body").each(function( index )
			{
				var user = $(".name").eq(index).text().slice(0,-1);
				$(this).before("<div style='padding:.5em;float:right'><img src='http://nostlagiasky.pw/gamefaqs-avatars/avatars/" + user +".png' /></div>");
			});

            $('img').error(function () {
                $(this).hide();
            });


		} else {


            $(".msg_body").css("padding-left", "115px");
            $(".msg_infobox").css("clear", "both");
            $(".msg_below").css("clear", "both");
			$(".msg_body").each(function( index )
			{
				var user = $(".name").eq(index).text().slice(0,-1);
				$(this).before("<div style='top:45px;padding:.5em;float:left'><img src='http://nostlagiasky.pw/gamefaqs-avatars/avatars/" + user +".png' /></div>");
			});

            $('img').error(function () {
                $(this).hide();
            });
		}			
	}
}

  /*$('img').each(function() {
    if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
      this.src="";
    }
  });*/

