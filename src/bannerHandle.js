/**
 * Class BannerHandle.
 *  [Controle the the banner]
 */
function BannerHandle() {

  /**
   *  ~display function.~
   *  [This function is used to display the banner and link the callBack with the button event].
   */
  this.display = function() {
    var self = this;
    var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.cssBanner + '</div>';
    $('body').append(bannerCode);
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

  this.initDebugInfo = function (info) {
    // Debug
    $('#antmine_content').append(this.debugInfo);
    this.dataDisplayDebugInfo(info);
    $('#antmine_arrow').click(function() {
      if ($(this).hasClass("antmine_arrow_active")) {
        $(this).removeClass("antmine_arrow_active");
        $("#antmine_debug").removeClass("antmine_debug_active");
      } else {
        $(this).addClass("antmine_arrow_active");
        $("#antmine_debug").addClass("antmine_debug_active");
      }
    });
    $('#antmine_debug_info').click(function() {
     $("#antmine_box_info").removeClass("antmine_box_active");
     $("#antmine_box_hash").removeClass("antmine_box_active");
     $("#antmine_box_activity").removeClass("antmine_box_active");
     $("#antmine_box_info").addClass("antmine_box_active");
   });
    $('#antmine_debug_activity').click(function() {
     $("#antmine_box_info").removeClass("antmine_box_active");
     $("#antmine_box_hash").removeClass("antmine_box_active");
     $("#antmine_box_activity").removeClass("antmine_box_active");
     $("#antmine_box_activity").addClass("antmine_box_active");
   });
    $('#antmine_debug_hash').click(function() {
     $("#antmine_box_info").removeClass("antmine_box_active");
     $("#antmine_box_hash").removeClass("antmine_box_active");
     $("#antmine_box_activity").removeClass("antmine_box_active");
     $("#antmine_box_hash").addClass("antmine_box_active");
   });
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
    <div id="antmine_arrow" class="antmine_arrow">\
    </div>\
    <img id="antmine_banner_logo" src="" \\>\
    <button id="antmine_accept" class="antmine_button">J\'accepte</button>\
  </div>';

  this.debugInfo = '\
  <div id="antmine_debug" class="antmine_debug">\
    <div id="antmine_debug_contenaire">\
      <div>\
        <button id="antmine_debug_info" class="antmine_button">Informations</button>\
        <button id="antmine_debug_activity" class="antmine_button">Activité</button>\
        <button id="antmine_debug_hash" class="antmine_button">Hash</button>\
      </div>\
      <div id="antmine_box_info" class="antmine_box antmine_box_active">\
        <table id="antmine_tab_info"> \
        </table>\
      </div>\
      <div id="antmine_box_activity">\
        <table id="antmine_tab_info"> \
        </table>\
      </div>\
      <div id="antmine_box_hash">\
        <table id="antmine_tab_info"> \
        </table>\
      </div>\
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
      position: absolute;\
      left: 50px;\
      top: 10px;\
    }\
    #antmine_accept {\
      position: absolute;\
      top: 15px;\
      height: 20px;\
      right: 15px;\
    }\
    .antmine_button {\
      background-color: #eadac6;\
      font-family: "Calibri sans serif", "Open Sans", "sans-serif";\
      font-weight: bolder;\
      padding: 0px 10px;\
      margin: 0;\
      border: 0px;\
    }\
    .antmine_button:hover { \
      background-color: #211f1e;\
    }\
    .antmine_arrow {\
      width: 0px;\
      height: 0px;\
      position: relative;\
      top: 17px;\
      left: 15px;\
      border-left: 10px solid rgba(0, 0, 0, 0);\
      border-right: 10px solid rgba(0, 0, 0, 0);\
      border-bottom: 16px solid rgb(234, 218, 198);\
      border-top: 0px solid rgba(0, 0, 0, 0);\
    }\
    .antmine_arrow_active {\
      border-bottom: 0px solid rgba(0, 0, 0, 0);\
      border-top: 16px solid rgb(234, 218, 198);\
    }\
    .antmine_debug {\
      height: 0;\
      width: 100%;\
      top: 0px;\
      left: 0;\
      right: 0;\
      background-color: #b5a899;\
      position: relative;\
      overflow: hidden;\
    }\
    .antmine_debug_active {\
      height: auto;\
    }\
    #antmine_debug_contenaire {\
      height: 98%;\
      width: 98%;\
      max-heigth:500px;\
      margin: 1%;\
    }\
    .antmine_box {\
      height: 0;\
      background-color: #eadac6;\
      margin: 1% 0 0 0;\
      overflow:hidden;\
    }\
    .antmine_box_active {\
      height: auto;\
    }\
  </style>\
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">';

  return this;
}
