/*
 * http://www.thevista.ru/page13925-multimedia_v_stile_html_5_tegi_audio_i_video
 */
function SoundSafari(options) {// {url:''}

	options = options || {};
	var self = this;
	
	var browser = {
		safari: false,
		msafari: false
	};
	
	var so = {
		sound: null,// экземпляр объекта Audio
		complete: false,// уже можно работать с sound(new Audio())
		scheme: {}
	}
	
	function __construct(opts) {
		// test safari mobile
		var ua = navigator.userAgent;
		if(/safari/i.test(ua) && /mobile/i.test(ua)) browser.msafari = true;
		else if(/safari/i.test(ua)) browser.safari = true;
		
		if(!browser.safari && !browser.msafari) {
			console.log('You browser is not "safari(mobile)"');
			return;
		}
		
		// test Audio
		if(typeof Audio != 'function' && typeof Audio != 'object') {
			console.log('Object: "Audio" - NOT FOUND');
			return;
		}
		
		// new Audio
		so.sound = new Audio(opts['url']);
		
		// preload
		preload(so.sound);
		
		// ready
		//ready(so.sound);
		so.sound.play();
		
		
		// ready
		//var ID = setInterval(function() {
		//	if(so.sound.readyState == 'complete' || so.sound.readyState == 4) clearInterval(ID);
		//	so.sound.play();
		//}, 1);
		
		// timeupdate
		so.sound.addEventListener('timeupdate', function() {
			console.log('currentTime: '+so.sound.currentTime);
		}, false);
		
		
		// preload
		/*
		so.sound.autobuffer = true;
		so.sound.preload = 'auto';
		
		if(browser.msafari) {
			var f0 = function(e) {console.log('click');
				_preload();
				document.body.removeEventListener('click',f0);
			}
			document.documentElement.addEventListener('click', function() {console.log('click');});
			//$(document.body).bind('click', function() {console.log('click');});
		} else if(browser.safari) {
			_preload();
		}
		*/
	}
	
	self.loadSoundScheme = function(scheme) {// {name:{start:0.00, end:0.00}}
		scheme = scheme || {};
		for(var i in scheme) {
			if(scheme[i] && typeof scheme[i].start == 'number' && typeof scheme[i].end == 'number') {
				so.scheme[i] = {start: scheme[i].start, end: scheme[i].end}
			}
		}
		console.log('Object scheme:');
		console.log(so.scheme);
	}
	
	self.play = function(name) {
		
	}
	
	self.pause = function(name) {
		
	}
	
	self.stop = function(name) {
		
	}
	
	self.stopPlay = function() {
		
	}
	
	// preload
	function preload(audio) {
		if(browser.msafari) {
			var force = function () {
  				audio.pause();
  				audio.removeEventListener('play', force, false);
			};
			audio.addEventListener('play', force, false);
			
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
			var kickoff = function () {
				audio.play();
				document.documentElement.removeEventListener(click, kickoff, true);
			};
			document.documentElement.addEventListener(click, kickoff, true);
		} else if(browser.safari) {
			
		}
	}
	
	function ready(audio) {
		var ID = setInterval(function() {
			if(audio.readyState == 'complete' || audio.readyState == 4) clearInterval(ID);
			audio.play();
			console.log('ready!!!');
		}, 1);
	}
	
	
	
	
	
	// add preload
	function _preload() {
		console.log('preload');
		so.sound.muted = true;
		so.sound.play();
		so.sound.addEventListener('canplay', function() {// loadeddata
			so.sound.pause();
			so.sound.currentTime = 0.001;
			so.complete = true;
			// loop!!!
		}, false);
	}
	
	// мютить через определенный промежуток времени
	
	
	__construct(options);
	
}


/*


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

*/
