videojs.plugin('secondPlugin', function() { 
	var player = this;

	//debugger
	var isParentLoc = (window.location != window.parent.location);
	var url = isParentLoc ? document.referrer : document.location;
	
	//  create an anchor element (note: no need to append this element to the document)
	var link = document.createElement('a');
	
	//  set href to any path
	link.setAttribute('href', url);
	
	var protocol = link.protocol;
	var host = link.host;
	var pathname = link.pathname;
	
	/*
	var urlString = 'url: ' + url + '\n' + 
					'protocol: ' + protocol + '\n' + 
					'host: ' + host + '\n' + 
					'pathname: ' + pathname + '\n';
	*/
	
	if (typeof String.prototype.startsWith != 'function') {
			// see below for better implementation!
			String.prototype.startsWith = function (str){
				return this.lastIndexOf(str, 0) === 0;
		};
	}
	
	if (typeof String.prototype.endsWith != 'function') {
			String.prototype.endsWith = function(suffix) {
				return this.indexOf(suffix, this.length - suffix.length) !== -1;
		};
	}
	
	if (typeof Array.prototype.contains != 'function') {
			Array.prototype.contains = function(str) {
			var i = this.length;
			while (i--) {
				if (this[i].startsWith(str) ) {
					return true;
				}
			}
			return false;
		}
	}	
	
	if (typeof Array.prototype.indexOfStartsWith != 'function') {
			Array.prototype.indexOfStartsWith = function(str) {
			var i = this.length;
			while (i--) {
				if (this[i].startsWith(str) ) {
					return i;
				}
			}
			return -1;
		}
	}	
	
	var pathArray = pathname.split( '/' );
	
	var containsUS = pathArray.contains('LaPrairie_US');
	
	var indexOfLP = pathArray.indexOfStartsWith('LaPrairie_');
	
	var localeExtra = null;
	var hasExtra = false;
	
	var localeSetting = null;
	
	if (indexOfLP >= 0)
	{
		localeExtra = pathArray[indexOfLP].split( '_' );
		hasExtra = (localeExtra.length > 1);
	}	
	else 
	{
		
		if (pathArray.length > 1)
		{
			if (verifyLocale(pathArray[1].toLowerCase()))
			{
				localeSetting = pathArray[1];
			}
		}
	}
	
	var newURL = protocol + '//' + host;
	
	if (!host.endsWith('/'))
		newURL += '/';
	
	// copy everything before LaPrarie
	for (var i = 0; i < indexOfLP; i++)
	{
		var tempStr = pathArray[i].trim();
		
		if(tempStr)
		{
			newURL +=  pathArray[i] + '/';
		}
	}
	
	if(indexOfLP >= 0)
		newURL +=  pathArray[indexOfLP] + '/';
	
	if(!containsUS && hasExtra && localeExtra != null)
	{
		newURL += localeExtra[1].toLowerCase();
	}
	else if (localeSetting)
	{
		newURL += localeSetting + '/';
	}
	
	newURL += 'collections';
	
	var myLinkFunc = null;
	
	if(pathArray.contains('LaPrairie_') || localeSetting)
	{
		myLinkFunc = function(event) {	
			var player = this;
			window.open(newURL, "_parent");
		};
	}
	else 
	{
		myLinkFunc = function(event) {	
			var player = this;
			window.open('http://laprairie.com/default/collections', "_parent");
		};
	}
	
	var myButton = player.controlBar.addChild('button');
	
	myButton.addClass('vjs-menu-button');
	myButton.addClass('vjs-link-button');			
	myButton.on("click", myLinkFunc);
});


function verifyLocale( localeToTest )
{
	var locales = 
		[
			'ae',
			'at',
			'aus',
			'br',
			'ch',
			'cn',
			'de',
			'es',
			'fr',
			'gb',
			'gr',
			'hk',
			'int',
			'it',
			'jp',
			'kr',
			'nl',
			'pt',
			'ru',
			'tw',
			'us'
		];
	
	return (locales.indexOf(localeToTest) >= 0)
}