document.addEventListener('DOMContentLoaded', function() {
  var verifyButton = document.getElementById('Verify');
  verifyButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
      d = document;

      /* sample code from other site, use as guideline */
      var f = d.createElement('form');
      f.action = 'http://gtmetrix.com/analyze.html?bm';
      f.method = 'post';
      var i = d.createElement('input');
      i.type = 'hidden';
      i.name = 'url';
      i.value = tab.url;
      f.appendChild(i);
      d.body.appendChild(f);
      f.submit();
    
    });
  }, false);
}, false);
