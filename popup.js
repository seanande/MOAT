var userPinHash = 1234; //eventually hash this number to make it secure
var SiteList = [];
var mode = "user"; //hidden, user, verify(change), update(change)

document.addEventListener('DOMContentLoaded', function() {
  
  var url = window.location.href;
  if (SiteList.indexOf(window.location.hostname) != -1) {
    //block/wait/redirect/etc until verify is pressed
    window.location.href = "file:///C:/Users/seana/Documents/placeholder.pdf"
    window.mode = "user";
    //make extension visible
  }
  
  var verifyButton = document.getElementById('verify');
  verifyButton.addEventListener('click', function() {
    //chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var pin = d.getElementById('pin');
      var pinNum = pin.value;
      var label   = d.getElementById("label");
      var message = d.getElementById("message");

      if(window.mode == "user") {
        if (pinNum == window.userPinHash) {
          //redirect to site
          window.location.href = url;
          window.mode = "hidden";
          //hide extension
        }
        else {
          message.innerHTML = "incorrect PIN"
        }
      } else if (window.mode == "verify") {
        if (pinNum == window.userPinHash) {
          //let user enter new password
          label.innerHTML = "enter new PIN";
          window.mode = "change";
        }
        else {
          message.innerHTML = "incorrect pin";
        }
      } else if (window.mode == "update") {
        window.userPinHash = pinNum;
      }
    //});
  }, false);
  
  var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
    //add the current page to the list
    SiteList.push(window.location.hostname);
  }, false);

  var changeButton = document.getElementById('change');
  changeButton.addEventListener('click', function() {
    //prompt user to change their pin
    var label = document.getElementById("label");
    label.innerHTML = "enter old PIN";

  }, false);

}, false);
