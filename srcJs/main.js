function    main() {
  var objData = new DataSniffer();
  objData.on("first", function(self){
    console.log(self.info);
  });
  objData.on("batteryState", function(str){
    console.log(str);
  });
  objData.on("tabActivState", function(str){
    console.log(str);
  })
  objData.run();
}

main();
