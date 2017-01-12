/**
 * Function main.
 *  [EXPLAIN WHAT IS FOR]
 */
function main() {
    var objData = new DataSniffer();
    objData.on("first", function(self) {
        console.log(self.info);
        $.post("/data", self.info);
    });

		/**
		 * 
		 */
    objData.on("batteryState", function(str) {
        console.log(str);
        $.post("/data", str);
    });

    /**
     *  ~Anonymous function.~
     *  [EXPLAIN WHAT IS FOR].
     * @param str [EXPLAIN WHAT IS IT].
     */
    objData.on("tabActivState", function(str) {
        console.log(str);
        $.post("/data", str);
    })
    objData.run();
}

main();
