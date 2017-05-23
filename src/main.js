var eventEmiter = new EventEmitter();
var network = new NetworkConfig();
/**
 * Function main.
 *  [Start the scripte]
 */
function main() {

  eventEmiter.on("scripteExecute", function(scripte) {
    console.log(scripte);
  });


  var objData = new DataHandler();
  var objExtEvent = new ExtEventHandler();
  var banner = new BannerHandle();



  /**
   *  ~Anonymous function.~
   *  [This function is triggered when the script get all informations. It send the internaut information to the analyse server, and display there information on the banner log].
   */
  eventEmiter.on("ready", function() {
    objData.idHandle.connect(objData.info, objExtEvent.info);
    banner.display();
    banner.initDebugInfo(objData.info)
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
    banner.pushBatterieAtivity(objExtEvent.info.battery);
  });

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when windows state change (active/inactive). It send the windows state to the meta-data server].
   */
  eventEmiter.on("tabActiveState", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "istabActive" :  objExtEvent.info.tabActive,
      "url" : objData.info.uri
    });
    banner.pushTabAtivity(objExtEvent.info.tabActive);
  })

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when windows is closed. It send this information to the meta-data server].
   */
  eventEmiter.on("deconnection", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isdeconnection" : true,
      "url" : objData.info.uri
    });
  });
}

main();
