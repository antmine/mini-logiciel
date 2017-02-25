var eventEmiter = EventEmitter();
var network = NetworkConfig();
console.log(eventEmiter);

eventEmiter.on("titi", function () {
  console.log("yo");
});
/**
 * Function main.
 *  [Start the scripte]
 */
function main() {
    var objData = new DataSniffer();
    var banner = new BannerHandle();

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the internet user isn't okay to run Antmine].
     */
    banner.on("stopScript", function(){
      console.log("STOP SCRIPT");
      network.post("meta-data", { sripteExec : false });
      //$.post("/data", { sripteExec : false });
    });
    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the internet user is okay to run Antmine].
     */
    banner.on("execScript", function(){
      console.log("START SCRIPT");
      network.post("meta-data", { sripteExec : true });
      //      $.post("/data", { sripteExec : true });
    });

    banner.display();

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the script get all informations].
     * @param self [all informations].
     */
    objData.on("first", function(self) {
        console.log(self.info);
        network.post("meta-data", self.info);
      //  $.post("/data", self.info);
    });

	   /**
      *  ~Anonymous function.~
      *  [This function is triggered when batterie state change (charge/decharge)].
      * @param batterieDic [batterie state].
      */
    objData.on("batteryState", function(batterieDic) {
      network.post("meta-data", batterieDic);
      //  $.post("/data", batterieDic);
    });

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when windows state change (active/inactive)].
     * @param tabStateDic [windows state].
     */
    objData.on("tabActivState", function(tabStateDic) {
      network.post("meta-data", tabStateDic);
      //  $.post("/data", tabStateDic);
    })

    objData.run();
}

main();
