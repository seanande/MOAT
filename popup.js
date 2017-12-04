var userPinHash = 1234; //eventually hash this number to make it secure
var SiteList = [];
var mode = "user"; //hidden, user, verify(change), update(change)
var currURL;
document.addEventListener('DOMContentLoaded', function() {

  /*makes URL object with data of the active tab*/
  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    var url = tabs[0].url;
    window.currURL = new URL(url);
  });


  if (SiteList.indexOf(window.currHost) != -1) {
    //block/wait/redirect/etc until verify is pressed
    window.location.href = "file:///C:/Users/seana/Documents/placeholder.pdf"
    window.mode = "user";
    //make extension visible
  }

  var verifyButton = document.getElementById('verify');
  verifyButton.addEventListener('click', function() {
    //chrome.tabs.getSelected(null, function(tab) {
      d = document;
      
      var pin = d.getElementById("pin");
      var pinNum = pin.value;
      var header = d.getElementById("header");
      var message = d.getElementById("message");
      var label   = d.getElementById("label");

      if(window.mode == "user") {
        if (pinNum == window.userPinHash) {
          //redirect current tab to site
          //window.location.href = url;
          //window.mode = "hidden";
          message.innerHTML = "Access granted";
          label.innerHTML = " ";
          pin.value = "";
          //hide extension
          d.hide;
        }
        else {
          label.innerHTML = "incorrect PIN";
          input.value = "";
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
        d.getElementById('change').innerHTML = "Change PIN";
      }
    //});
  }, false);
  
  var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
    //add the current page to the list
    var url  = window.currURL;
    var host = (new URL(url)).hostname;
    SiteList.push(host);
    message = document.getElementById('message');
    message.innerHTML = "Added " + host + " to your protected sites."
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
