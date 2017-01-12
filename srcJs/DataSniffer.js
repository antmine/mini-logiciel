function DataSniffer() {
  this.on = function(key, callB) {
    this.callBack[key].push(callB);
  //  console.log(this.callBack[key]);
  }

  this.getBatteryInfo = function() {
    var self = this;
    try {
      navigator.getBattery().then(function(result) {

        var prevState = self.info.battery;
        self.info.battery = result.charging;
        if (prevState == null && self.info.tabActiv != null)
          self.callBack["first"][0](self);
        else if (prevState != self.info.battery)
          self.callBack["batteryState"][0]({ "battery" : self.info.battery });
      //  self.DataDisplayConsole();
      //  self.DataDisplayPage();
      });
    } catch (err) {
      console.warn("Browser does not have battery info");
      self.info.battery ='error';
    }
  }

  this.getFocusInfo = function() {
    var prevState = this.info.tabActiv;
    this.info.tabActiv = (document.visibilityState == "visible");
    if (prevState == null && this.info.battery != null)
      self.callBack["first"][0](self);
    else if (prevState != this.info.tabActiv)
      this.callBack["tabActivState"][0]({ "tabActiv" :  this.info.tabActiv  });
  }

  this.getCoreInfo = function() {
	   this.info.core =  navigator.hardwareConcurrency;
  }

  this.getUri = function() {
	   this.info.uri = document.referrer;
  }

  this.getGLParams = function(gl) {
    console.log(gl);
    var glExtensionTextureFloat = gl.getExtension( 'OES_texture_float' );
    var glExtensionTextureHalfFloat = gl.getExtension( 'OES_texture_half_float' );
    var glExtensionDebugRendererInfo = gl.getExtension( 'WEBGL_debug_renderer_info' );
    var glExtensionDrawBuffers = gl.getExtension( 'WEBGL_draw_buffers' );
    var glExtensionAnisotropic = gl.getExtension( 'EXT_texture_filter_anisotropic' )
    || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
    var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (dbgRenderInfo != null) {
	     this.info.webGLRenderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
       this.info.webGLVendor   = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
     } else {
       this.info.webGLRenderer = "error";
       this.info.webGLVendor = "error";
     }
     this.info.webGLVersion =  gl.getParameter(gl.VERSION);
     this.info.webGLLanguage = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  }

  this.getCPUInfos = function() {
    try {
      var canvas = document.getElementById("gl");
	    var gl = canvas.getContext("experimental-webgl", { stencil: true });
      //var gl = canvas.getContext("webgl");
	    this.getGLParams(gl);
	  } catch (error) {
	    console.error("Error getting gpu info");
	  }
  }

  this.doHash = function() {
      this.info.hashCPUAverage = Module.ccall("get_hashes_per_second");
  }

  this.fastLoop = function() {
    this.getFocusInfo();
    this.getBatteryInfo();
    var self = this;
    setTimeout(function() {self.fastLoop();}, 500);
  }

  this.slowLoop = function() {
    this.doHash();
    var self = this;
    setTimeout(function() {self.slowLoop();}, 3000);
  }

  this.DataDisplayConsole = function() {
    console.log("uri : " + this.info.uri);
    console.log("NB core :" + this.info.core);
    console.log("webGLRenderer : " + this.info.webGLRenderer);
    console.log("webGLVendor : " + this.info.webGLVendor);
    console.log("webGLVersion : " + this.info.webGLVersion);
    console.log("webGLLanguage : " + this.info.webGLLanguage);
    console.log("tabActiv : " + this.info.tabActiv);
    console.log("hashCPUAverage : " + this.info.hashCPUAverage);
    console.log("battery : " + this.info.battery);
  }

  this.DataDisplayPage = function() {
    $("#uriValue").text(this.info.uri);
    $("#coreValue").text(this.info.core);
    $("#webGLRendererValue").text(this.info.webGLRenderer);
    $("#webGLVendorValue").text(this.info.webGLVendor);
    $("#webGLVersionValue").text(this.info.webGLVersion);
    $("#webGLLanguageValue").text(this.info.webGLLanguage);
    $("#tabActivValue").text(this.info.tabActiv);
    $("#hashCPUAverageValue").text(this.info.hashCPUAverage);
    $("#batteryValue").text(this.info.battery);
  }

  this.run = function(){
    this.getCoreInfo();
    this.getCPUInfos();
    this.getUri();
    //this.fastLoop();
    //this.slowLoop();
    var self = this;
    setTimeout(function() {self.fastLoop();}, 500);
    setTimeout(function() {self.slowLoop();}, 3000);
  }

  this.callBack = {};
  this.callBack["batteryState"] = [];
  this.callBack["tabActivState"] = [];
  this.callBack["first"] = [];

  this.info = {};

  return this;
}
