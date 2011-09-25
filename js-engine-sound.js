/*
 * http://www.thevista.ru/page13925-multimedia_v_stile_html_5_tegi_audio_i_video
 */

function listSounds(options) {
	
	options = options || {};
	var self = this;
	var browser = {
		chrome:false,
		ie:false,
		ff:false,
		opera:false,
		safari:false,
		msafari:false
	};
	var sounds = {};
	
	function __construct(options) {
		// определять браузер
		var ua = navigator.userAgent;
		
		if(/opera/i.test(ua)) browser.opera = true;
		else if(/msie/i.test(ua)) browser.ie = true;
		else if(/firefox/i.test(ua)) browser.ff = true;
		else if(/chrome|chromium/i.test(ua)) browser.chrome = true;
		else if(/safari/i.test(ua) && /mobile/i.test(ua)) browser.msafari = true;
		else if(/safari/i.test(ua)) browser.safari = true;
		
		// // определять, возможно ли проигрывать несколько звуков одновременно
		
		// safari mobile(preload) [document click ]
		
	}
	
	self.add = function(path, name, callback) {// path "" || ["",""], callback(err, data
		if(sounds[name] && (typeof sounds[name] == 'object' || typeof sounds[name] == 'function')) {
			if(typeof callback == 'function') callback(11);
			return;
		}
		
		if(typeof Audio != 'function' && typeof Audio != 'object') {
			if(typeof callback == 'function') callback(12, "\"Audio()\" - NOT FOUND");
			return;
		}
		
		if(!path || (typeof path != 'object' && typeof path != 'function')) path = [path];
		
		for(var i=0; i<path.length; i++) {
			var exp = getCodec(path[i]);
			if(browser.ie || browser.safari || browser.msafari) {
				if(exp == 'mp3') sounds[name] = new Audio(path[i]);
			} else if(browser.opera || browser.chrome || browser.ff) {
				if(exp == 'ogg') sounds[name] = new Audio(path[i]);
			}
		}
		
		if(!sounds[name]) {
			if(typeof callback == 'function') callback(13);
			return;
		}
		
		// readyState ["complete"]
		sounds[name].addEventListener('loadeddata', function() {// canplay
			sounds[name].currentTime = 0.001;
			sounds[name]['user-load'] = true;
		}, false);
		
		// preload!!!
		sounds[name].autobuffer = true;
		sounds[name].preload = 'auto';
		//sounds[name].load();// только для .src
		
		if(browser.safari || browser.msafari) {// только после первого click
			sounds[name].play();
			sounds[name].pause();
		}
		
		if(typeof callback == 'function') callback(0);
		
	}
	
	self.remove = function(name) {
		
	}
	
	self.play = function(name, position, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		sounds[name].play();
	}
	
	self.pause = function(name, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		sounds[name].pause();
	}
	
	self.stop = function(name, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		sounds[name].pause();
		sounds[name].currentTime = 0.001;
	}
	
	self.stopPlay = function(name, position, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		sounds[name].pause();
		sounds[name].currentTime = 0.001;
		sounds[name].play();
	}
	
	self.loop = function(name, status, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		// ff
	}
	
	self.mute = function(name, status, callback) {
		if(!sounds[name] || typeof sounds[name] != 'object') {
			if(typeof callback == 'function') callback(14);
			return;
		}
		if(!sounds[name]['user-load']) {
			if(typeof callback == 'function') callback(15);
			return;
		}
		sounds[name].muted = status?true:false;
		if(typeof callback == 'function') callback(0);
	}
	
	self.pos = function(name) {
		sounds[name].currentTime = 0.001;
	}
	
	function getCodec(obj) {
		if(/mp3$/i.test(obj+"")) return 'mp3';
		else if(/ogg$/i.test(obj+"")) return 'ogg';
		else return 'unknown';
	}
	
	__construct(options);
	
}
