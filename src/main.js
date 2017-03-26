var eventEmiter = new EventEmitter();
var network = new NetworkConfig();
/**
 * Function main.
 *  [Start the scripte]
 */
function main() {
  var objData = new DataHandler();
  var objExtEvent = new ExtEventHandler();
  var banner = new BannerHandle();

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when the script get all informations].
   * @param self [all informations].
   */
  eventEmiter.on("ready", function() {
    objData.idHandle.connect(self.info);
    banner.display();
    banner.initDebugInfo(objData.info)
    banner.pushBatterieAtivity(objExtEvent.info.battery);
    banner.pushTabAtivity(objExtEvent.info.tabActiv);
  });


  eventEmiter.on("GPUhash", function() {
    banner.pushHash(objData.info.hashCPUAverage);
  });

  /**
  *  ~Anonymous function.~
  *  [This function is triggered when batterie state change (charge/decharge)].
  * @param batterieDic [batterie state].
  */
  eventEmiter.on("batteryState", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isOnBattery" : objExtEvent.info.battery
    });
    banner.pushBatterieAtivity(objExtEvent.info.battery);
  });

  /**
   *  ~Anonymous function.~
   *  [This function is triggered when windows state change (active/inactive)].
   * @param tabStateDic [windows state].
   */
  eventEmiter.on("tabActivState", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isTabActiv" :  objExtEvent.info.tabActiv
    });
    banner.pushTabAtivity(objExtEvent.info.tabActiv);
  })

  eventEmiter.on("deconnection", function() {
    network.post("meta-data", {
      "id": objData.idHandle.getId(),
      "isdeconnection" : true
    });
  });
}

main();
