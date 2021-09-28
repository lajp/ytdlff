// Connect to the "ytdlff" app.
var port = browser.runtime.connectNative("ytdlff");
var portFromCS;
var enabled = true;

function connected(p) {
	portFromCS = p;
	portFromCS.onMessage.addListener(function(m) {
		if(m.location !== undefined && enabled){
			console.log(m.location);
			function onGot(tabs) {
				browser.tabs.remove(tabs[0].id);
			}
			function onError(error) {
				console.log(`Error: ${error}`);
			}
			try {
				port.postMessage(m.location);
			} catch (error) {
				port = browser.runtime.connectNative("ytdlff");
				port.postMessage(m.location);
			}
			let querying = browser.tabs.query({url: m.location});
			querying.then(onGot, onError)
		}
	});
}

function toggleOnOff() {
	enabled = !enabled;
	if(enabled)
	{
		browser.browserAction.setIcon({path: "icons/ytdlon.svg"});
	}
	else
	{
		browser.browserAction.setIcon({path: "icons/ytdloff.svg"});
	}
}

browser.runtime.onConnect.addListener(connected);
browser.browserAction.onClicked.addListener(toggleOnOff);
