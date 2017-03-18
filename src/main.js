var eventEmiter = new EventEmitter();
var network = new NetworkConfig();
/**
 * Function main.
 *  [Start the scripte]
 */
function main() {
    var objData = new DataSniffer();
    var banner = new BannerHandle();

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the script get all informations].
     * @param self [all informations].
     */
    eventEmiter.on("ready", function() {
        console.log("ready");
        console.log(objData.info);
        network.post("meta-data", objData.info);
        banner.display();
        banner.initDebugInfo(objData.info)
        banner.pushBatterieAtivity(objData.info.battery);
        banner.pushTabAtivity(objData.info.tabActiv);

      //  $.post("/data", self.info);
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
      network.post("meta-data", { "battery" : objData.info.battery });
      banner.pushBatterieAtivity(objData.info.battery);
      //  $.post("/data", batterieDic);
    });

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when windows state change (active/inactive)].
     * @param tabStateDic [windows state].
     */
    eventEmiter.on("tabActivState", function() {
      network.post("meta-data", { "tabActiv" :  objData.info.tabActiv });
      banner.pushTabAtivity(objData.info.tabActiv);
      //  $.post("/data", tabStateDic);
    })

    objData.run();
}

main();
