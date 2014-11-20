videojs.plugin('firstPlugin', function() {
  var player = this,
    overlay = document.createElement('p');
  overlay.className = 'vjs-overlay';
  overlay.innerHTML = "First Plugin Changed!";
  player.el().appendChild(overlay);
});