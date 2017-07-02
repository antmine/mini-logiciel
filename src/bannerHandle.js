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
    if(document.getElementById('antmine_content') === null) {
      var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.cssBanner + '</div>';
      $('body').append(bannerCode);
      $('#antmine_accept').click(function() {
        self.remove();
      });
      this.initDebugInfo();
    }
  }

  /**
   *  ~dataDisplayDebugInfo function.~
   *  [This function is used to display internaute informations].
   * @param info [internaute information];
   */
  this.dataDisplayDebugInfo = function(info) {
    console.log("");
    var str;
    str = '<tr><th>uriValue</th><th>'+info["uri"]+'</th></tr>';
    str += '<tr><th>coreValue</th><th>'+info["core"]+'</th></tr>';
    str += '<tr><th>webGLRendererValue</th><th>'+info["webGLRenderer"]+'</th></tr>';
    str += '<tr><th>webGLVendorValue</th><th>'+info["webGLVendor"]+'</th></tr>';
    str += '<tr><th>webGLVersionValue</th><th>'+info["webGLVersion"]+'</th></tr>';
    str += '<tr><th>webGLLanguageValue</th><th>'+info["webGLLanguage"]+'</th></tr>';

    $('#antmine_tab_info').append(str);
  }

  this.idDisplayInDebugInfo = function(idInfo) {
    var str= '<tr><th>Id</th><th>'+idInfo['id']+'</th></tr>';
    str+= '<tr><th>New Id</th><th>'+idInfo['new']+'</th></tr>';
    $('#antmine_tab_info').append(str);
    var button = '<button type="button" id="antmine_removeCookie" name="antmine_removeCookie">removeCookie</button>\
    <script type="text/javascript">\
        $("#antmine_removeCookie").click(function() {\
          $.removeCookie("antmine_id");\
        });\
      </script>';
    $('#antmine_box_info').append(button);
  }

  /**
   *  ~ dataDisplayDebugInfo function.~
   *  [This function is used to add line in the hash tab].
   * @param info [tab state (true/false)];
   */
  this.initDebugInfo = function() {
    $('#antmine_content').append(this.debugInfo);
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
      $("#antmine_box_miner").removeClass("antmine_box_active");
   });
    $('#antmine_debug_activity').click(function() {
      $("#antmine_box_info").removeClass("antmine_box_active");
      $("#antmine_box_hash").removeClass("antmine_box_active");
      $("#antmine_box_activity").removeClass("antmine_box_active");
      $("#antmine_box_activity").addClass("antmine_box_active");
      $("#antmine_box_miner").removeClass("antmine_box_active");
   });
    $('#antmine_debug_hash').click(function() {
      $("#antmine_box_info").removeClass("antmine_box_active");
      $("#antmine_box_hash").removeClass("antmine_box_active");
      $("#antmine_box_activity").removeClass("antmine_box_active");
      $("#antmine_box_hash").addClass("antmine_box_active");
      $("#antmine_box_miner").removeClass("antmine_box_active");
   });
   $('#antmine_debug_miner').click(function() {
     $("#antmine_box_info").removeClass("antmine_box_active");
     $("#antmine_box_hash").removeClass("antmine_box_active");
     $("#antmine_box_activity").removeClass("antmine_box_active");
     $("#antmine_box_hash").removeClass("antmine_box_active");
     $("#antmine_box_miner").addClass("antmine_box_active");
  });
  }


  /**
   *  ~pushTabAtivity function.~
   *  [This function is used to add line in the tabState tab].
   * @param info [tab state (true/false)];
   */
  this.pushTabAtivity = function(info) {
    str = '\
    <tr>\
      <th>' + Date() + '</th>\
      <th>' + info + '</th>\
    </tr>';
    $('#antmine_col_tab').append(str);
  }

  /**
   *  ~pushHash function.~
   *  [This function is used to add line in the batterie tab].
   * @param info [batterie state];
   */
  this.pushBatterieAtivity = function(info) {
    str = '\
    <tr>\
      <th>' + Date() + '</th>\
      <th>' + info + '</th>\
    </tr>';
    $('#antmine_col_batterie').append(str);
  }

  /**
   *  ~pushHash function.~
   *  [This function is used to add line in the hash tab].
   * @param info [hash per seconds];
   */
  this.pushHash = function(info) {
    str = '\
    <tr>\
      <th>' + Date() + '</th>\
      <th>' + info + '</th>\
    </tr>';
    $('#antmine_tab_hash').append(str);
  }

  /**
   *  ~remove function.~
   *  [This function is used to stop display the banner].
   */
  this.remove = function() {
    $("#antmine_content").remove();
  }

  this.displayMiningData = function(data) {
    $('#antmine_miner_log').val(JSON.stringify(data));
  }

  this.displayMiningMessage = function(message) {
    if (message.hasOwnProperty("total_hashed")) {
      $('#antmine_miner_total_hashes').val(message.total_hashed);
    }
  //  console.log(message.hashes_per_second);
    if (message.hasOwnProperty("hashes_per_second")) {
      $('#antmine_miner_hashes_per_second').val(message.hashes_per_second);
    }

    if (message.hasOwnProperty("golden_ticket")) {
      $('#antmine_miner_golden_ticket').val(message.golden_ticket);
    }
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
      <div class="antmine_debug_nav">\
        <button id="antmine_debug_info" class="antmine_button">Informations</button>\
        <button id="antmine_debug_activity" class="antmine_button">Activité</button>\
        <button id="antmine_debug_hash" class="antmine_button">Hash</button>\
        <button id="antmine_debug_miner" class="antmine_button">Log Miner</button>\
      </div>\
      <div id="antmine_box_info" class="antmine_box antmine_box_active">\
        <table id="antmine_tab_info"> \
        </table>\
      </div>\
      <div id="antmine_box_activity" class="antmine_box">\
        <table id="antmine_tab_activity"> \
          <tr>\
            <th>tabActive</th><th>battery</th>\
          </tr>\
          <tr>\
            <td>\
              <table id="antmine_col_tab">\
                <tr>\
                  <th>date</th><th>value</th>\
                </tr>\
              </table>\
            </td>\
            <td>\
              <table id="antmine_col_batterie">\
                <tr>\
                  <th>date</th><th>value</th>\
                </tr>\
              </table>\
            </td>\
          </tr>\
        </table>\
      </div>\
      <div id="antmine_box_hash" class="antmine_box">\
        <table id="antmine_tab_hash"> \
        </table>\
      </div>\
      <div id="antmine_box_miner" class="antmine_box">\
        <table id="antmine_tab_miner"> \
          <div id="antmine_miner_info">\
            Total Hashes: <INPUT id="antmine_miner_total_hashes" />\
		        <br />\
            Hash/s: <INPUT id="antmine_miner_hashes_per_second" />\
            <br />\
            Golden Ticket: <INPUT id="antmine_miner_golden_ticket" />\
          </div>\
          <textarea id="antmine_miner_log">\
          </textarea> \
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
      overflow:hidden;\
      margin: 1%;\
    }\
    .antmine_debug_nav {\
      margin: 0;\
      margin-bottom: 1px;\
    }\
    .antmine_debug_nav button {\
      width: 24%;\
      margin: 0 0 1% 0;\
    }\
    #antmine_miner_log {\
      float: left;\
      width: 49%;\
      height: 100%;\
    }\
    #antmine_miner_info {\
      float: left;\
      width: 50%;\
      height: 100%;\
    }\
    .antmine_box {\
      height: 0;\
      background-color: #eadac6;\
      overflow-y: scroll;\
      overflow-x: hidden;\
    }\
    .antmine_box_active {\
      height: 300px;\
    }\
  </style>\
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">';

  return this;
}
