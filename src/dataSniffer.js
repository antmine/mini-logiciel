/**
 * Class BannerHandle.
 *  [Controle the execution scripte]
 */
function DataSniffer() {
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
        if (prevState == undefined/*null*/&& self.info.tabActiv != undefined) {
          console.log("connect");
          self.idHandle.connect(self.info);
          eventEmiter.trigger("ready");
        }
        else if (prevState != self.info.battery)
          eventEmiter.trigger("batteryState");
        //self.dataDisplayConsole();
        self.dataDisplayPage();
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
    if (prevState == undefined/*null*/ && this.info.battery != undefined) {
      console.log("connect");
      this.idHandle.connect(this.info);
      eventEmiter.trigger("ready");
    } else if (prevState != this.info.tabActiv)
      eventEmiter.trigger("tabActivState");
  }
  this.initFocusEvent = function() {
    console.log("init");
    var self = this;
    $(window).focusin(function () {
      self.info.tabActiv = true;
      console.log("focusin win");
      eventEmiter.trigger("tabActivState");
    });
    $(window).focusout(function () {
      self.info.tabActiv = false;
      console.log("focusout win");
      eventEmiter.trigger("tabActivState");
    });

  }
// firefox
//window.onunload
// chrome
//
var unloadEvent = function (e) {
    var confirmationMessage = "Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?";

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Webkit, Safari, Chrome etc.
};
window.addEventListener("beforeunload", unloadEvent);
//  $(window).on('beforeunload'/*"unload"*/, function() {
  /*  alert("toto");
    //eventEmiter.trigger("deconnexion");
  });

  window.onunload = window.onbeforeunload = function() {
    alert("toto");
    //eventEmiter.trigger("deconnexion");
  };*/
  /**
   *  ~fastLoop function.~
   *  [This function is used to get the battery state and the page state each 500 ms].
   */
  this.fastLoop = function() {
    this.getFocusInfo();
    this.getBatteryInfo();
    var self = this;
    setTimeout(function() {
      self.fastLoop();
    }, 500);
  }

  /**
   *  ~doHash function.~
   *  [This function is used to know this CPU power by counting the number of hash per second].
   */
  this.doHash = function() {
    this.info.hashCPUAverage = Module.ccall("get_hashes_per_second");
    eventEmiter.trigger("GPUhash");
  }

  /**
   *  ~slowLoop function.~
   *  [This function is used to a hash test each 3 s].
   */
  this.slowLoop = function() {
    this.doHash();
    var self = this;
    setTimeout(function() {
      self.slowLoop();
    }, 3000);
  }


  /**
   *  ~doHash function.~
   *  [This function is used to know the web site uri].
   */
  this.getUri = function() {
    this.info.uri = $(location).attr('href');
  }


  /**
   *  ~getGLParams function.~
   *  [This function is used to know informations about the WebGl environemnt].
   */
  this.getGLParams = function(gl) {
//    console.log(gl);
    var glExtensionTextureFloat = gl.getExtension('OES_texture_float');
    var glExtensionTextureHalfFloat = gl.getExtension('OES_texture_half_float');
    var glExtensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info');
    var glExtensionDrawBuffers = gl.getExtension('WEBGL_draw_buffers');
    var glExtensionAnisotropic = gl.getExtension('EXT_texture_filter_anisotropic')
                                || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
    var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");

    if (dbgRenderInfo != null) {
      this.info.webGLRenderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
      this.info.webGLVendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
    } else {
      this.info.webGLRenderer = "error";
      this.info.webGLVendor = "error";
    }
    this.info.webGLVersion = gl.getParameter(gl.VERSION);
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
    this.initFocusEvent();

    var self = this;
    setTimeout(function() {
      self.fastLoop();
    }, 500);
    setTimeout(function() {
      self.slowLoop();
    }, 3000);
  }


  this.info = {};
  this.idHandle = new IdHandle();

  return this;
}
