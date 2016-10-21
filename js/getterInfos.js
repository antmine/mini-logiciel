function GetterInfos () {

    this.getBatteryInfo = function(info) {
	try {
	    navigator.getBattery().then(function(result) {
		info.battery =  result.charging;
		sendInfoToServer(info);
	    });
	} catch (err) {
	    console.warn("Browser does not have battery info");
	    info.battery ='error';
	}
    }

    this.getFocusInfo = function(info) {
	if (document.visibilityState == "visible")
	    info.tabActiv = true;
	else
	    info.tabActiv = false;
    }

    this.getCoreInfo = function(info) {
	info.core =  navigator.hardwareConcurrency;
    }

    this.getUri = function(info) {
	info.uri = document.referrer;
    }

    this.getGLParams = function(gl, info) {
	var glExtensionTextureFloat = gl.getExtension( 'OES_texture_float' );
	var glExtensionTextureHalfFloat = gl.getExtension( 'OES_texture_half_float' );
	var glExtensionDebugRendererInfo = gl.getExtension( 'WEBGL_debug_renderer_info' );
	var glExtensionDrawBuffers = gl.getExtension( 'WEBGL_draw_buffers' );
	var glExtensionAnisotropic = gl.getExtension( 'EXT_texture_filter_anisotropic' )
	    || gl.getExtension( 'WEBKIT_EXT_texture_filter_anisotropic' );
	var dbgRenderInfo = gl.getExtension("WEBGL_debug_renderer_info");

	if (dbgRenderInfo != null) {
	    info.webGLRenderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL);
	    info.webGLVendor   = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL);
	} else {
	    info.webGLRenderer = "error";
	    info.webGLVendor = "error";
	}

	info.webGLVersion =  gl.getParameter(gl.VERSION);
	info.webGLLanguage = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
    };

    this.getCPUInfos = function(info) {
	try {
	    var canvas = document.getElementById("gl");
	    var gl = canvas.getContext("experimental-webgl", { stencil: true });

	    getGLParams(gl, info);
	} catch (error) {
	    console.error("Error getting gpu info");
	}
    }
    
}
