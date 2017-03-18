/**
 * Class BannerHandle.
 *  [Controle the the banner]
 */
function BannerHandle() {

  /**
   *  ~display function.~
   *  [This function is used to display the banner and link the callBack with the button event].
   */
  this.display = function(info) {
    var self = this;
    var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.debugInfo + this.cssBanner + '</div>';
    $('body').append(bannerCode);
    this.dataDisplayDebugInfo(info);
    $('#antmine_accept').click(function() {
      self.remove();
    });
  }

  this.dataDisplayDebugInfo = function(info) {
    for (var key in info) {
      var str = '<tr><th>' + key +'</th><th>'+ info[key]+'<th></tr>';
      $('#antmine_tab_info').append(str);
    }
  }

  /**
   *  ~remove function.~
   *  [This function is used to stop display the banner].
   */
  this.remove = function () {
    $("#antmine_content").remove();
  }

  this.htmlBanner = '\
  <div id="antmine_banner">\
    <img id="antmine_banner_logo" src="" \\>\
    <button id="antmine_accept">J\'accepte</button>\
  </div>';

  this.debugInfo = '\
  <div id="antmine_debug">\
    <div id="antmine_debug_contenaire">\
      <table id="antmine_tab_info"> \
      </table>\
    </div>\
  </div>';

  this.cssBanner = '\
  <style>\
    #antmine_content {\
      width: 100%;\
      bottom: 0;\
      left: 0;\
      right: 0;\
      background-color: gray;\
      position: fixed;\
      font-family: "Calibri sans serif", "Open Sans", "sans-serif";\
    }\
    #antmine_banner {\
      height: 50px;\
      width: 100%;\
      top: 0;\
      left: 0;\
      right: 0;\
      background-color: #6d5e51;\
      position: relative;\
    }\
    #antmine_banner_logo {\
      height: 30px;\
      width: 30px;\
      position: inherit;\
      left: 10px;\
      top: 10px;\
    }\
    #antmine_accept {\
      position: absolute;\
      top: 15px;\
      height: 20px;\
      right: 15px;\
      background-color: #eadac6;\
      font-family: "Calibri sans serif", "Open Sans", "sans-serif";\
      font-weight: bolder;\
      padding: 0px 10px;\
      margin: 0;\
      border: 0px;\
    }\
    #antmine_debug {\
      height: 0;\
      width: 100%;\
      top: 0px;\
      left: 0;\
      right: 0;\
      background-color: #b5a899;\
      position: relative;\
      overflow: hidden;\
    }\
    #antmine_debug:active {\
      height: auto;\
    }\
    #antmine_debug_contenaire {\
      height: 98%;\
      width: 98%;\
      margin: 1%;\
      background-color: #eadac6\
    }\
  </style>\
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">';

  return this;
}
