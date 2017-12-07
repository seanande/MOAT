var userPin = 1234; //eventually hash this number to make it secure
var SiteList = ["www.google.com"];
var mode = "user"; //hidden, user, verify(change), update(change)
var currURL;
var oldURL;

document.addEventListener('DOMContentLoaded', function() {

  /*makes URL object with data of the active tab*/
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

    window.oldURL = tabs[0].url;
    window.currURL = new URL(window.oldURL);
    chrome.storage.sync.get("SiteList", function (list) {
        window.SiteList = list.SiteList;
        if (window.SiteList.indexOf(window.currURL.hostname) != -1) {
          //redirect until verify is pressed
          var newURL = "file:///C:/Users/seana/Documents/Moat.pdf"
          chrome.tabs.update(tabs[0].id, {url: newURL});

          window.mode = "user";
        }
    });
  });

  var verifyButton = document.getElementById('verify');
  verifyButton.addEventListener('click', function() {
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
      d = document;

      //Get data from page
      var pin = d.getElementById("pin");
      var pinNum = pin.value;
      var header = d.getElementById("header");
      var message = d.getElementById("message");
      var label   = d.getElementById("label");

      if(window.mode == "user") {
        if (pinNum == window.userPin) {
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
        window.userPin = pinNum;
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
    
    chrome.storage.sync.get('SiteList', function (list) {
      //update SiteList from local storage
      window.SiteList = list.SiteList;
    });

    window.SiteList.push(host);
    //store new list in chrome storage
    chrome.storage.sync.set({'SiteList': window.SiteList}, function() {
      message = document.getElementById('message');
      message.innerHTML = "Added " + host + " to your protected sites.";
    });
  }, false);


  var changeButton = document.getElementById('change');
  changeButton.addEventListener('click', function() {
    //prompt user to change their PIN
    var message = document.getElementById("message");
    var label = document.getElementById("label");
    if(window.mode == "user") {
      message.innerHTML = "Enter old PIN";
      label.innerHTML = "";
      document.getElementById("change").innerHTML = "Cancel";
      window.mode = "verify";
      document.getElementById("pin").value = "";
    }
    else if (window.mode == "verify" || window.mode == "update") {
      /* Cancel the update PIN */
      window.mode = "user";
      message.innerHTML = "Enter your 4-digit PIN";
      label.innerHTML = "";
      document.getElementById("change").innerHTML = "Change PIN";
      document.getElementById("pin").value = "";
    }
  }, false);

}, false);
