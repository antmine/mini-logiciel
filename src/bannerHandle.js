function BannerHandle(){
  this.on = function(key, callB) {
    this.callBack[key] = callB;
  }

  this.display = function(){
    var bannerCode = '<div id="antmine_content">' + this.htmlBanner + this.cssBanner + '</div>';
    console.log(bannerCode);
    $('body').append(bannerCode);
    $('#antmine_start_script').click(function(){
      $("#antmine_banner").remove();
      this.callBack["execScript"]();
    });
    $('#antmine_stop_script').click(function(){
      $("#antmine_banner").remove();
      this.callBack["stopScript"]();
    });
  }

  this.htmlBanner = '<div id="antmine_banner"> <button id="antmine_start_script">OUI</button> <button id="antmine_stop_script">NON</button> </div>';
  this.cssBanner = '<style> #antmine_banner, #antmine_content {height : 250px; width : 100%;}  </style>';

  this.callBack = {};
  this.callBack["execScript"] = function(){};
  this.callBack["stopScript"] = function(){};
}
