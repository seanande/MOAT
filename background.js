/** have to somehow get these variables to work in other file
var userPinHash = 1234; //eventually hash this number to make it secure
var SiteList = [];
var mode = "user"; //hidden, user, verify(change), update(change)
var currURL;


/*makes URL object with data of the active tab*/
chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
  var url = tabs[0].url;
  window.currURL = new URL(url);

  if (SiteList.indexOf(window.currURL.hostname) != -1) {
    //block/wait/redirect/etc until verify is pressed
    var newURL = "file:///C:/Users/seana/Documents/placeholder.pdf"
    chrome.tabs.update(tabs[0].id, {url: newURL});

    window.mode = "user";
    //make extension visible
    window.open;
  }
});
