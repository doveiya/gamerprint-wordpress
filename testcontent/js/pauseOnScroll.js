var videoList = [];
var scrollPauseList = [];
var clickedPauseList = [];

if (!window.jQuery) {
	var jq = document.createElement('script'); jq.type = 'text/javascript';
	// Path to jquery.js file, eg. Google hosted version
	jq.src = 'http://players.brightcove.net/2744552112001/firstRepo/jquery-1.11.1.js';
	document.getElementsByTagName('head')[0].appendChild(jq);
}		

$(".video-js").each(function(){	
		videoList[videoList.length] = this.id;
		scrollPauseList[scrollPauseList.length] = false;
		clickedPauseList[scrollPauseList.length] = false;
	});	

for(var i = 0; i < videoList.length; i++)
{
	var playerID = videoList[i];
	var player = videojs(playerID);
	
	player.on('pause', function() {
		var pID = videoList.indexOf(this.id());
		
		if(!scrollPauseList[pID])
		{
			clickedPauseList[pID] = true;
			scrollPauseList[pID] = false;
		}
		else
		{
			clickedPauseList[pID] = false;
			scrollPauseList[pID] = false;
		}
	});
}

var myScrollFunc = function() {

	$(".video-js").each(function(){	
	
		var inView = $(this).is(":in-viewport");
		var isPaused = $(this)[0].player.paused();
		var playerIdx = videoList.indexOf(this.id);
		var scrollPaused = scrollPauseList[playerIdx];
		var clickPaused = clickedPauseList[playerIdx];
		
		if (inView) {						
			var hasEnded = $(this)[0].player.ended();
			var curTime = $(this)[0].player.currentTime();
			var hasStarted = curTime > 0;
			if(hasStarted && !hasEnded && !clickPaused)
			{
				scrollPauseList[playerIdx] = false;
				$(this)[0].player.play();
			}
		} else if(!isPaused) {						
			scrollPauseList[playerIdx] = true;
			$(this)[0].player.pause();
		}
	});
};		

$(window).scroll(myScrollFunc);	