var userPinHash = 1234; //eventually hash this number to make it secure
var SiteList = [];
var mode = "user"; //hidden, user, verify(change), update(change)
var currURL;
var currHost;
document.addEventListener('DOMContentLoaded', function() {

  chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
    window.currURL = tabs[0].url;
  });

  /*adapted from Stack Overflow answer 
  function extractRootDomain(url) {
    var domain = extractHostname(url);
    var splitArr = domain.split('.');
    var arrLen = splitArr.length;

    //extracting the root domain here
    //if there is a subdomain 
    if (arrLen > 2) {
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
      if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) {
        //this is using a ccTLD
        domain = splitArr[arrLen - 3] + '.' + domain;
      }
    }
    return domain;
  }*/

  //window.currHost = extractRootDomain(window.currURL);
  //alert(window.currHost);

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
      
      message.innerHTML = "mode: " + window.mode + " pin: " + window.userPinHash;
      label.innerHTML = "pin = " + pinNum;
      if(window.mode == "user") {
        if (pinNum == window.userPinHash) {
          //redirect current tab to site
          //window.location.href = url;
          //window.mode = "hidden";
          message.innerHTML = "Access granted";
          label.innerHTML = " ";
          //hide extension
          d.hide;
        }
        else {
          label.innerHTML = "incorrect PIN";
        }
      }
      else if (window.mode == "verify") {
        if (pinNum == window.userPinHash) {
          //let user enter new password
          message.innerHTML = "Enter new PIN";
          label.innerHTML = " ";
          window.mode = "update";
        }
        else {
          label.innerHTML = "Incorrect PIN";
        }
      } 
      else if (window.mode == "update") {
        window.userPinHash = pinNum;
        d.getElementById('add').visible = true;
        message.innerHTML = "Enter your 4-digit PIN";
        label.innerHTML = "PIN updated"
      }
    //});
  }, false);
  
  var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
    //add the current page to the list
    var url  = window.currURL;
    var host = (new URL(url)).hostname;
    alert(url + "  " + host);
    SiteList.push(host);
    message = document.getElementById('message');
    message.innerHTML = "Added " + host + " to your protected sites."
  }, false);

  var changeButton = document.getElementById('change');
  changeButton.addEventListener('click', function() {
    //prompt user to change their pin
    var header = document.getElementById("header");
    header.innerHTML = "Enter old PIN";
    document.getElementById("add").visible = false;
    window.mode = "verify";

  }, false);

}, false);
