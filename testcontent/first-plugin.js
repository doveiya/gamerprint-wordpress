videojs.plugin('firstPlugin', function() {  
	var player = this;
	
	var myFunc = function(event) {	
		var player = this;
		window.open('http://laprairie.com/');
	};
	
	var myButton = player.controlBar.addChild('button');
	
	myButton.addClass('vjs-menu-button');
	myButton.addClass('myLinkButton');			
	myButton.on("click", myFunc);
});