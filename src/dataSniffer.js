/**
 * Class BannerHandle.
 *  [Controle the execution scripte]
 */
function DataSniffer() {
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
   *  ~DataDisplayConsole function.~
   *  [This function is used to display the DataSniffer"s data on the console (Debug function)].
   */
  this.dataDisplayConsole = function() {
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

  /**
   *  ~dataDisplayPage function.~
   *  [This function is used to display the DataSniffer"s data on the html document(Debug function)].
   */
  this.dataDisplayPage = function() {
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

  /**
   *  ~getBatteryInfo function.~
   *  [This function is used to know the state of batterie and trigger the "first" and the "batteryState" event].
   */
  this.getBatteryInfo = function() {
    var self = this;
    try {
      navigator.getBattery().then(function(result) {

        var prevState = self.info.battery;
        self.info.battery = result.charging;
        if (prevState == null && self.info.tabActiv != null) {
          self.idHandle.connect(self.info);
          self.callBack["first"](self);
        }
        else if (prevState != self.info.battery)
        self.callBack["batteryState"]({ "battery" : self.info.battery });

        //self.DataDisplayConsole();
        self.DataDisplayPage();
      });
    } catch (err) {
      console.warn("Browser does not have battery info");
      self.info.battery ='error';
    }
  }

  /**
   *  ~getFocusInfo  function.~
   *  [This function is used to know if the page is active or not and trigger the "tabActivState" event].
   */
  this.getFocusInfo = function() {
    var prevState = this.info.tabActiv;
    this.info.tabActiv = (document.visibilityState == "visible");
    if (prevState == null && this.info.battery != null)
    self.callBack["first"][0](self);
    else if (prevState != this.info.tabActiv)
    this.callBack["tabActivState"]({ "tabActiv" :  this.info.tabActiv  });
  }
  // TODO :: ajouter detection fenetere active

  /**
   *  ~fastLoop function.~
   *  [This function is used to get the battery state and the page state each 500 ms].
   */
  this.fastLoop = function() {
    this.getFocusInfo();
    this.getBatteryInfo();
    var self = this;
    setTimeout(function() {self.fastLoop();}, 500);
  }

  /**
   *  ~doHash function.~
   *  [This function is used to know this CPU power by counting the number of hash per second].
   */
  this.doHash = function() {
    this.info.hashCPUAverage = Module.call("get_hashes_per_second");
  }

  /**
   *  ~slowLoop function.~
   *  [This function is used to a hash test each 3 s].
   */
  this.slowLoop = function() {
    this.doHash();
    var self = this;
    setTimeout(function() {self.slowLoop();}, 3000);
  }


  /**
   *  ~doHash function.~
   *  [This function is used to know the web site uri].
   */
  this.getUri = function() {
    this.info.uri = document.referrer;
  }


  /**
   *  ~getGLParams function.~
   *  [This function is used to know informations about the WebGl environemnt].
   */
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

  /**
   *  ~getGPUInfos function.~
   *  [This function is used to get the informations about the GPU].
   */
  this.getGPUInfos = function() {
    try {
      var canvas = document.getElementById("gl");
      var gl = canvas.getContext("experimental-webgl", { stencil: true });
      this.getGLParams(gl);
    } catch (error) {
      console.error("Error getting gpu info");
    }
  }

  /**
   *  ~getCoreInfo function.~
   *  [This function is used to know how many core there are in the CPU].
   */
  this.getCoreInfo = function() {
    this.info.core = navigator.hardwareConcurrency;
  }

  /**
   *  ~run function.~
   *  [This function is used to start the object and get all information].
   */
  this.run = function(){
    if (this.idHandle.getId() == undefined) {
      this.getCoreInfo();
      this.getGPUInfos();
      this.getUri();
    }

    var self = this;
    setTimeout(function() {
      self.fastLoop();
    }, 500);
    setTimeout(function() {
      self.slowLoop();
    }, 3000);
  }

  this.callBack = {};
  this.callBack["batteryState"] = function() {};
  this.callBack["tabActivState"] = function() {};
  this.callBack["first"] = function() {};
  this.info = {};
  this.idHandle = new IdHandle();

  return this;
}
