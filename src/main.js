/**
 * Function main.
 *  [Start the scripte]
 */
function main() {
    var objData = new DataSniffer();
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
