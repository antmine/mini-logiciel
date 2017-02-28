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
    $('#antmine_accept').click(function(){
      $("#antmine_content").remove();
      self.callBack["execScript"]();
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
    <button id="antmine_accept">J\'accepte</button>\
  </div>';
  this.cssBanner = '\
  <style>\
    #antmine_banner, #antmine_content {\
      height: 50px;\
      width: 100%;\
      bottom: 0;\
      left: 0;\
      right: 0;\
      background-color: gray;\
      position: fixed;\
    }\
    #antmine_accept {\
      position: absolute;\
      right: 2%;\
      top: 15px;\
      height: 20px;\
    };\
  </style>';

  this.callBack = {};
  this.callBack["execScript"] = function(){};
  this.callBack["stopScript"] = function(){};

  return this;
}
