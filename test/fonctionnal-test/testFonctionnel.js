var page = require('webpage').create();
page.clearCookies;
page.onConsoleMessage = function(msg) {
  console.log('Page title is ' + msg);
};
page.open("http://127.0.0.1:5000", function(status) {
  page.evaluateAsync(function() {
    console.log(document.title);

//    phantom.exit();
  }, 100);
  //  evaluateAsync(function, [delayMillis, arg1, arg2, ...])
});
