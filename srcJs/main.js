function    main() {
  var objData = new DataSniffer();
  objData.on("first", function(self){
    console.log(self.info);
    $.post( "/data", self.info);
  });
  objData.on("batteryState", function(str){
    console.log(str);
    $.post( "/data", str);
  });
  objData.on("tabActivState", function(str){
    console.log(str);
    $.post( "/data", str);
  })
  objData.run();
}

main();
