/**
 * Class DataHandler.
 *  [get the internaute's computer information]
 */

function DataHandler() {
  /**
   *  ~doHash function.~
   *  [This function is used to know this CPU power by counting the number of hash per second].
   */
  this.doHash = function() {
    this.info.hashs_per_second = Module.ccall("get_hashes_per_second");
    eventEmiter.trigger("GPUhash");
  }

  /**
   *  ~slowLoop function.~
   *  [This function is used to a hash test each 3 s].
   */
  this.loop = function() {
    this.doHash();
    var self = this;
    setTimeout(function() {
      self.loop();
    }, 1000);
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
    this.info.cores = navigator.hardwareConcurrency;
  }

  this.info = {};
  this.idHandle = new IdHandle();

  this.getCoreInfo();
  this.getGPUInfos();
  this.getUri();
  this.loop();

  return this;
}
