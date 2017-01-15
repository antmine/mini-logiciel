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

    });
    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the internet user is okay to run Antmine].
     */
    banner.on("execScript", function(){

    });

    banner.display();

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when the script get all informations].
     * @param self [all informations].
     */
    objData.on("first", function(self) {
        console.log(self.info);
        $.post("/data", self.info);
    });

	   /**
      *  ~Anonymous function.~
      *  [This function is triggered when batterie state change (charge/decharge)].
      * @param str [batterie state].
      */
    objData.on("batteryState", function(str) {
        console.log(str);
        $.post("/data", str);
    });

    /**
     *  ~Anonymous function.~
     *  [This function is triggered when windows state change (active/inactive)].
     * @param str [windows state].
     */
    objData.on("tabActivState", function(str) {
        console.log(str);
        $.post("/data", str);
    })

    objData.run();
}

main();
