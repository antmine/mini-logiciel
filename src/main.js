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
      $.post("/data", { sripteExec : false });
    });
    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the internet user is okay to run Antmine].
     */
    banner.on("execScript", function(){
      console.log("START SCRIPT");
      $.post("/data", { sripteExec : true });
    });

    banner.display();

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the script get all informations].
     * @param self [all informations].
     */
    objData.on("first", function(self) {
        $.post("/data", self.info);
    });

	   /**
      *  ~Anonymous function.~
      *  [This function is triggered when batterie state change (charge/decharge)].
      * @param batterieDic [batterie state].
      */
    objData.on("batteryState", function(batterieDic) {
        $.post("/data", batterieDic);
    });

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when windows state change (active/inactive)].
     * @param tabStateDic [windows state].
     */
    objData.on("tabActivState", function(tabStateDic) {
        $.post("/data", tabStateDic);
    })

    objData.run();
}

main();
