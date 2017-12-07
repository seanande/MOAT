var userPinHash = 1234; //eventually hash this number to make it secure
var SiteList = ["www.google.com"];
var mode = "user"; //hidden, user, verify(change), update(change)
var currURL;
var oldURL;

/*makes URL object with data of the active tab*/
/*chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
  
  //alert("in query");
  window.oldURL = tabs[0].url;
  window.currURL = new URL(window.oldURL);

  chrome.storage.sync.get("SiteList", function (list) {
    console.log(list);
    window.SiteList = list;
  });

  if (window.SiteList.indexOf(window.currURL.hostname) != -1) {
    //block/wait/redirect/etc until verify is pressed
    var newURL = "file:///C:/Users/seana/Documents/placeholder.pdf"
    chrome.tabs.update(tabs[0].id, {url: newURL});

    window.mode = "user";
    //make extension visible
  }
});*/

document.addEventListener('DOMContentLoaded', function() {
  console.log("loaded");
  chrome.storage.sync.get("PIN", function(userPIN) {
    //get userPIN from storage
  });

  /*makes URL object with data of the active tab*/
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    
    //alert("in query");
    window.oldURL = tabs[0].url;
    window.currURL = new URL(window.oldURL);
    chrome.storage.sync.get("SiteList", function (list) {
        console.log(list);
        window.SiteList = list;
    });

    console.log(window.currURL.hostname);
    console.log(window.SiteList);
    console.log(window.SiteList.indexOf(window.currURL.hostname));
    if (window.SiteList.indexOf(window.currURL.hostname) != -1) {
      //block/wait/redirect/etc until verify is pressed
      var newURL = "file:///C:/Users/seana/Documents/placeholder.pdf"
      chrome.tabs.update(tabs[0].id, {url: newURL});

      window.mode = "user";
      //make extension visible
    }
  });

  var verifyButton = document.getElementById('verify');
  verifyButton.addEventListener('click', function() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
      d = document;
      
      var pin = d.getElementById("pin");
      var pinNum = pin.value;
      var header = d.getElementById("header");
      var message = d.getElementById("message");
      var label   = d.getElementById("label");

      if(window.mode == "user") {
        if (pinNum == window.userPinHash) {
          message.innerHTML = "Access granted";
          label.innerHTML = " ";
          pin.value = "";
          //redirect current tab to site
          chrome.tabs.update(tabs[0].id, {url: window.oldURL});
          //hide extension
          window.close();
        }
        else {
          label.innerHTML = "incorrect PIN";
          pin.value = "";
          message.innerHTML = "Enter your 4-digit PIN";
        }
      }
      else if (window.mode == "verify") {
        /* Verify old PIN so they can update PIN */
        if (pinNum == window.userPinHash) {
          //let user enter new PIN
          message.innerHTML = "Enter new PIN";
          label.innerHTML = " ";
          window.mode = "update";
          pin.value = "";
          verifyButton.innerHTML = "Update PIN";
        }
        else {
          label.innerHTML = "Incorrect PIN";
          pin.value = "";
        }
      } 
      else if (window.mode == "update") {
        window.userPinHash = pinNum;
        message.innerHTML = "Enter your 4-digit PIN";
        label.innerHTML = "PIN updated"
        pin.value = "";
        verifyButton.innerHTML = "Verify";
        window.mode = "user";
        d.getElementById('change').innerHTML = "Change PIN";
      }
    });
  }, false);
  
var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
    //add the current page to the list
    var host = window.currURL.hostname;
    
    chrome.storage.sync.get("SiteList", function (list) {
      //update SiteList from local storage
      console.log("defined SiteList as...");
      console.log(list);
      window.SiteList = list;
    });

    console.log(typeof(window.SiteList));
    window.SiteList.push(host);

    //store new list in chrome storage
    chrome.storage.sync.set({'SiteList': window.SiteList}, function() {
      message = document.getElementById('message');
      message.innerHTML = "Added " + host + " to your protected sites.";
      console.log(window.SiteList);
    });
  }, false);


  var changeButton = document.getElementById('change');
  changeButton.addEventListener('click', function() {
    //prompt user to change their PIN
    var message = document.getElementById("message");
    var label = document.getElementById("label");
    if(window.mode == "user") {
      message.innerHTML = "Enter old PIN";
      label.innerHTML = " ";
      document.getElementById("change").innerHTML = "Cancel";
      window.mode = "verify";
      document.getElementById("pin").value = "";
    }
    else if (window.mode == "verify" || window.mode == "update") {
      /* Cancel the update PIN */
      window.mode = "user";
      message.innerHTML = "Enter your 4-digit PIN";
      label.innerHTML = " ";
      document.getElementById("change").innerHTML = "Change PIN";
      document.getElementById("pin").value = "";
    }
  }, false);

}, false);
