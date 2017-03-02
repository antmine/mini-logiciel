/**
 * Class BannerHandle.
 *  [Controle the the banner]
 */
function BannerHandle(){

  /**
   *  ~display function.~
   *  [This function is used to display the banner and link the callBack with the button event].
   */
  this.display = function(){
    var self = this;
    var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.cssBanner + '</div>';
    $('body').append(bannerCode);
    $('#antmine_accept').click(function(){
      self.remove();
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
  return this;
}
