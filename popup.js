document.addEventListener('DOMContentLoaded', function() {
  
  var s = d.createElement('site');
  s.type = 'hidden';
  s.name = 'url';
  s.value = tab.url;
  // if s.value is in SiteList
  //    block/wait/redirect/etc until verify is pressed
  //    make extension visible
  
  var verifyButton = document.getElementById('Verify');
  verifyButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      var pin = d.getElementById('pin');
      var pinNum = pin.value;
      //if pinNum == userPin
      //    unblock/redirect to site
      //    hide extension
      
    });  
  }, false);
  
  var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {
      //make new html that prompts for url to add to list
  }. false);
}, false);
