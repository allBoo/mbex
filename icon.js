var cookies = {};
var cookiesList = document.cookie.split('; ');
for (var i = 0; i < cookiesList.length; i++) {
	var cookie = cookiesList[i].split('=');
	cookies[cookie[0]] = decodeURIComponent(cookie[1].replace(/\+/g,  " "));
}

chrome.extension.sendMessage({type:'showPageAction', user: {id: cookies.battle, name: cookies.mylogin, gamecity_url: window.location.origin}});
