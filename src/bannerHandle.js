/**
 * Class BannerHandle.
 *  [Controle the the banner]
 */
function BannerHandle(){
  /**
   *  ~On function.~
   *  [This function is used to set the callBack].
   * @param key [key (string)].
   * @param callB [callBack].
   */
  this.on = function(key, callB) {
    this.callBack[key] = callB;
  }

  /**
   *  ~display function.~
   *  [This function is used to display the banner and link the callBack with the button event].
   */
  this.display = function(){
    var self = this;
    var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.cssBanner + '</div>';
    console.log(bannerCode);
    $('body').append(bannerCode);
    $('#antmine_start_script').click(function(){
      $("#antmine_content").remove();
      self.callBack["execScript"]();
    });
    $('#antmine_stop_script').click(function(){
      $("#antmine_content").remove();
      self.callBack["stopScript"]();
    });
  }

  /**
   *  ~remove function.~
   *  [This function is used to stop display the banner].
   */
  this.remove = function () {
      $("#antmine_content").remove();
  }

  this.htmlBanner = '<div id="antmine_banner"> <button id="antmine_start_script">OUI</button> <button id="antmine_stop_script">NON</button> </div>';
  this.cssBanner = '<style> #antmine_banner, #antmine_content {height : 250px; width : 100%;}  </style>';

  this.callBack = {};
  this.callBack["execScript"] = function(){};
  this.callBack["stopScript"] = function(){};

  return this;
}
