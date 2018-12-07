function Now() { return new Date().getTime() / 1000; };
function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s};
var started = window.performance.timing.navigationStart/1000;

function Icon16(path) {
	return {
      'icon16' : path,
    }
}

function Color(r,g,b,a) {
	return {
      'r' : Math.round(r),
      'g' : Math.round(g),
      'b' : Math.round(b),
      'a' : a || 1
    };
}
WHITE=Color(255,255,255)

var firstlog=true;
var toremove = [];
function LogNoRemove() { 
	Log.apply(null,arguments);
	return toremove.pop(); 
};
function Log() {
	
	if (toremove.length>=15) {
		var e = toremove.shift();
		//e.fadeOut(1000,function() {
			e.remove();
		//});
	};
	
	var elem = $("<div>");
	
	toremove.push(elem);
	
	var col = Color(255,255,255,255);
	
	var first=true;
	var txt2=[];
	for(var i = 0; i < arguments.length; i++) {
		var e = arguments[i];
		if (typeof e == "object" && ('r' in e && 'g' in e && 'b' in e)) {
			col = e;
		} else if (typeof e == "object" && ('icon16' in e)) {
			var ico = $("<img>");
			ico.css("display","inline-block");
			ico.css("width","16px");
			ico.css("height","16px");
			ico.css("margin-right","4px");
			var path = "asset://garrysmod/materials/icon16/"+e['icon16']+'.png';
			ico.attr('src',  path );
			
			elem.append(ico);
		} else {
			var txt = $("<span>");
			
			txt.text(e);
			first=false;
			txt.css("color",
				'rgb('+ 
				col.r + ", " +
				col.g + ", " +
				col.b + 
				")"
			);
			
			elem.append(txt);
			txt2.push(e);
		}
	}
	
	txt2 = txt2.join("");
	console.log(txt2);
	
	elem.css("padding-left","1em");
	elem.css("text-indent","-1em");
	
	$("#console").append(elem);
	return elem;
}

LogD=Log;



// GMod download queue

var INFO = Color(45, 255, 99);

iDownloading=false;
iFileCount=false;
files_downloaded=0;

var remaining_elem;
var remaining_logline;
function UpdateDownloading(a) {
	
	var remaining = iDownloading - files_downloaded;
	
	if (remaining<-2) {
		if (remaining_elem) {
			remaining_elem.remove();
		} else {
			return;
		}
	} 
	
	if (!remaining_logline) {
		remaining_logline = LogNoRemove(INFO,"Files remaining ",WHITE,remaining);
		remaining_elem = remaining_logline.children().last();
	};
	
	remaining_elem.text(remaining>0 && remaining || 0);
	
	Log(Icon16("world_go")," ",a.replace(/\//g,"↘").replace(/_/g," "));
};


function OnExtraInfo(data,textStatus, request,same_instance) 
{
		if (!same_instance) {
			OnServerCrashed();
		};
}

function DoGmodQueue(entry) {
	var a = entry[1];
	var b = entry[2];
	var c = entry[3];
	
	switch (entry[0]) {
		case DOWNLOAD_FILES:
			files_downloaded++;
			UpdateDownloading(a);
			break;
		case STATUS_CHANGED:
			Log(a);
			break;
		case FILES_NEEDED:
			if (a!=iDownloading) {
				Log(INFO,"Files needed ",WHITE,a,b,c);
			}
			iDownloading = a;
			break;
		case FILES_TOTAL:
			if (a!=iFileCount) {
				Log(INFO,"Files total ",WHITE,a,b,c);
			}
			iFileCount = a;
			break;
		default:
			LogD("???",a,b,c);
	}

}

function OnGmodQueue() {
	while (gmod_queue.length>0) {
		var entry = gmod_queue.pop();
		DoGmodQueue(entry);
	};
};


function OnImagesLoaded(res) {
	if (!res) return;
	var imageslist = res['result'];
	if (!imageslist) return;
	
	var t = [];
	for (key in imageslist) {
		var dat = imageslist[key];
		var approved = dat['approval'];
		if (!approved) { continue; }
		var creator = dat['comment'];
		var url = dat['url'];
		t.push([url,creator || ""]);
	}
	shuffle(t);	
	//LogD("OnImagesLoaded " + t.length);
	
	if (t.length==0) { return; };
	
	var img1 = document.getElementById("img1");
	var img2 = document.getElementById("img2");
	
	var imgn = 0;
	function ImageLoadLoop(){
		var rndimage = t[imgn];
		if (!rndimage) {
			imgn=0;
			rndimage = t[0];
		}
		var first = imgn==0;
		imgn = imgn + 1;
		
		var src = "http://"+rndimage[0];
		
		var credits = document.getElementById("credits");
		var img = new Image();
		img.onerror = function() { setTimeout(ImageLoadLoop,8000); };
		img.onload = function() {
			var target = img1;
			if (first) {
				$(target).hide();
				$(target).fadeIn(2000,function(data){ 
					HideLogo();
				});
				target.style.backgroundRepeat = 'no-repeat';
				target.style.backgroundPosition = 'center';
				target.style.backgroundSize = 'cover';
			};
			
			target.style.backgroundImage = "url('" + this.src + "')";
			
			setTimeout(ImageLoadLoop,first && 10000 || 8000);
			
			credits.textContent = rndimage[1] || "";
		}
		img.src = src;
		
	}
	ImageLoadLoop();
	
}

function OnServerCrashed() {
	Log("Server",Color(255,22,20)," CRASHED",Color(255,2222,255),", reconnect manually!");
}

function OnPlayerLoadedData(dat) {
	var loadingspeed = dat && dat.loadingspeed;
	if (!dat) {
		Log(Color(255,100,20),"First join",WHITE,"? ",Color(100,255,20),"Welcome",WHITE,", traveler!");
	}
	
	//LogD("OnPlayerLoadedData "+loadingspeed);
	loadingspeed = loadingspeed || 0;
	
	var container = document.getElementById("progress1meter");
	
	$(container).fadeIn(2000);
	
	var prog = document.getElementById("progress1");
	var progtxt = document.getElementById("progress1text");
	function SetProgress1(f,txt)
	{
		f=f>1 && 1 || f<0.01 && 0.01 || f;
		prog.style.width = (f*100)+"%";
		progtxt.textContent = txt;
	};
	var hiddenprogress = false;
	setInterval(function() {
		var spent = Now()-started;
		var remaining = loadingspeed-spent;

		var txt = fmtMSS(~~ (remaining>=0 && remaining || spent ));
		
		if 	(remaining>=0) {	
			txt += " / "+fmtMSS(~~ loadingspeed);
		};
		
		if (!hiddenprogress && loadingspeed<spent) {
			hiddenprogress = true;
			$("#progress1hide").fadeOut(3000);
		}
		var f = (spent)/loadingspeed;
		SetProgress1(f,txt);
	},1000/25);
}


// hide "Meta Construct" logo
(function() {
	var ishidden = false;
	window.HideLogo = function() {
		if (ishidden) { return; };
		ishidden = true;
		setTimeout(function() {
			//$( "#splash1" ).hide();
			$( "#splashcenter1" ).velocity({
				
				p: { opacity: 0 },
				o: { duration: 3000 }
			});
		},500);
	};
})();


function LoadPlayerList() {
	var elem;
	var ul;
	
	var failurl = "http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/"+
				"fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg";
				
	var serverid = $.urlParam('serverid') || $.urlParam('server') || 1;
	
	var playersurl = 'http://r6cf.metastruct.uk.to:2095/app/playerlist?server='+serverid
	
	var usrinfos = {};
	
	var first_q = true;
	
	var last_server = 0;
	
	var OnPlayerList = function(data,textStatus, request) {
		if (!data) {
			console.log("Unable to load "+playersurl);
			return;
		};
		var first_query = first_q;
		first_q = false;

		if (first_query) {
			last_server = data.started || 0;
		}
		
		
		var same_instance = !data.started || data.started == last_server || last_server == 0;
		OnExtraInfo(data,textStatus, request,same_instance);
		
		var pls = data && data.players;
		
		if (!elem) {
			var a = LogNoRemove(Color(1,200,255),"Players on server: ",Color(255,255,255),pls && pls.length);
			elem = a.children().last();
		};
		
		
		elem.text(pls.length);
		
		if (!ul) {
			var tickerw = $('<div id="tickerw">');
			ul = $('<div id="ticker">');
			$("body").append(tickerw);
			tickerw.append(ul);
			
			var e = tickerw[0];
			var top0=-500;
			var dir = true;
			var time;
			function pageScroll() {
				// deltatime
				var now = Now();
				var dt =  now - (time || now);
				if (dt>0.1) { dt=0.1 };
				time = now;

				
				if (dir) {
					var sh = e.scrollHeight;
					if (top0 > (sh - 256)) {
						dir = !dir;
					};
				} else {
					if (top0 <= -256) {
						dir = !dir;
					};
				};
				
				
				var x = dt*100;
				top0 = top0 + (dir && x || -x);
				e.style.top = -Math.floor(top0)+"px";
				requestAnimationFrame(pageScroll);
			}
			pageScroll();

		
		};
		
		//ul.empty();
		
		shuffle(pls);
		
		Object.keys(usrinfos).forEach(function (userid) {
			var data = usrinfos[userid];
			data.purge = true;
		});
		
		var maxvisible = 0;
		
		$.each(pls, function(i, t) {
			
			var name 		= t[0];
			var userid		= t[1];
			var avatarurl 	= t[2];
			var playtime 	= t[3];
			var afk 		= t[4];
			var accountid	= t[5];
			
			var prev = usrinfos[userid];
			if (prev) {
				prev.purge = false;
				
				//TODO: update infos
				
				return;
			};
			
			
			var extrapx = Math.floor(Math.cos(i*3.1415*0.6)*31);
			
			var li = $('<div>');
				var div = $('<div class="tickerentry">');
					var img = $('<img class="avatarimg">');
					var txt = $('<div class="tickerentrytxt">');
						div.append(img);
						div.append(txt);
				li.append(div);
			ul.append(li);
			
			li.data("infos",t);
			li.css("position",'relative');
			
			img.attr('src',  avatarurl || failurl );				
			img.one( "error", function() {
				img.attr('src', failurl );
			});
			
			txt.text(name);
			
			if (!fullyVisible(div)) {
				maxvisible = maxvisible || (i+1);
				
			};

			li.velocity({
				p: {
					translateX: [ extrapx, 150-extrapx ]
				},
				o: {
					duration: 2900
				}
			});
			
			if (!first_query) {
				console.log("New "+name);
			}
			
			usrinfos[userid] = {
				"infos": t,
				"elem": li,
				"purge": false
			};
			
		});
		
		Object.keys(usrinfos).forEach(function (userid) {
			var data = usrinfos[userid];
			if (data.purge) {
				delete usrinfos[userid];
				
				console.log("Purging "+userid+ ' - '+data.infos[0]);
				
				var we = data.elem;
				
				var other = ul.children().last();
				
				we.replaceWith(other);
				we.remove();
			};
		});
		

	};
	
	var last_server;
	function RefreshPlayers() {  
		
		$.ajax({
		url : playersurl,
		dataType: "json",
		timeout: 10000,
		success: function (a,b,c) {  
			
			OnPlayerList(a,b,c);
			
		},
		statusCode: {
			504: function() {
				Log("Request timeout");
			},
			503: function() {
				Log("Server down??");
			},
			500: function() {
				Log("INTERNAL ERROR");
			},
			404: function() {
				Log("This isnt working");
			}
		},
		error: function (xhr,e,errthrown) {
			Log("Playerlist failed: " + e);
		} 
		}).always(function() { setTimeout(RefreshPlayers,9000); });
		
	};

	RefreshPlayers();
	setInterval(function() {
		//ul.randomize();
	},4000); 
	window.RefreshPlayers=RefreshPlayers;
	
	
	
};



// helper functions  /////////////////////////////////////////////////////////////////

(function($) {

$.fn.randomize = function(childElem) {
  return this.each(function() {
      var $this = $(this);
      var elems = $this.children(childElem);

      elems.sort(function() { return (Math.round(Math.random())-0.5); });  

      $this.detach(childElem);  

      for(var i=0; i < elems.length; i++)
        $this.append(elems[i]);      

  });    
}
})(jQuery);


function fullyVisible(elm) {
  var vpH = $(window).height(), 
    st = $(window).scrollTop(),
    y = $(elm).offset().top,
    h = $(elm).height();
  return (y > st && y + h < (vpH + st));
};


// http://stackoverflow.com/a/2450976/3776346
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURIComponent(results[1] || 0);
    }
}


if ( !window.requestAnimationFrame ) {

	window.requestAnimationFrame = ( function() {

		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

			window.setTimeout( callback, 1000 / 60 );

		};

	} )();

}

///////////////////////////////////////////////////////////////

// Images list wiring

if (typeof imageslist !== 'undefined') {
	OnImagesLoaded(imageslist);
}


// player loading time wiring
(function() {
	var success = false;
	addEventListener("message", function(event){
		success = true;
		var dat = JSON.parse(event.data);
		OnPlayerLoadedData(dat);
	}, false)

	var iframe = document.createElement('iframe');
	iframe['sandbox'] = 'allow-scripts';
	iframe.style.display = 'none';
	iframe.onload = function() { 
		success = true;
		iframe.parentNode.removeChild(iframe); 
	};
	iframe.src = "asset://garrysmod/data/loading_screen_data/metastruct_joinspeed2.txt";
	document.body.appendChild(iframe);
	setTimeout(function(){
	setTimeout(function(){
	setTimeout(function(){
		if (!success) {
			OnPlayerLoadedData(false);
			iframe.parentNode.removeChild(iframe);
		};
	}, 33);
	}, 33);
	}, 33);
})();


LoadPlayerList();

// check if anything in queue
OnGmodQueue();


$(function() {
	if ((document.location+"").indexOf("changelev")==-1) {
		return;
	}
	
	var asd=$("<small>"); 
	asd.text("Changing level...");   
	$('<br>').appendTo($("#splashcenter1")); 
	asd.appendTo($("#splashcenter1"));
});