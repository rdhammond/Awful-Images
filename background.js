chrome.tabs.executeScript(null, {file: "jquery.min.js"}, function() {
	chrome.tabs.executeScript(null, {file: "main.js"});
});
