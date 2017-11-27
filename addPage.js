document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementById('add');
  addButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;
      
      var i = d.getElementById('site');
      var s = d.createElement('newSite');
      s.type = 'text';
      s.name = 'site url';
      s.value = i.value;
      //add s to list
    });
  }, false);
}, false);
