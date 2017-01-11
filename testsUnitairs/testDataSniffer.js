QUnit.test('Test Side Effect getCoreInfo',function suite(assert) {

    var obj = init();
    obj.getCoreInfo();

    assert.equal(obj.info.uri,null,"Good Uri")
    assert.notEqual(obj.info.core, 0, "");
    assert.equal(obj.info.webGLRenderer, null, "");
    assert.equal(obj.info.webGLVendor, null, "");
    assert.equal(obj.info.webGLVersion, null, "");
    assert.equal(obj.info.webGLLanguage, null, "");
    assert.equal(obj.info.tabActiv, null, "");
    assert.equal(obj.info.hashCPUAverage, 0, "");
    assert.equal(obj.info.battery, null, "");

});

QUnit.test('Test Side Effect getUri',function suite(assert) {
    var obj = init();
    obj.getUri();

    assert.notEqual(obj.info.uri,null,"Good Uri")
    assert.equal(obj.info.core, 0, "");
    assert.equal(obj.info.webGLRenderer, null, "");
    assert.equal(obj.info.webGLVendor, null, "");
    assert.equal(obj.info.webGLVersion, null, "");
    assert.equal(obj.info.webGLLanguage, null, "");
    assert.equal(obj.info.tabActiv, null, "");
    assert.equal(obj.info.hashCPUAverage, 0, "");
    assert.equal(obj.info.battery, null, "");
});

QUnit.test('Test Side Effect getBatteryInfo',function suite(assert) {
    var done = assert.async();
    var obj = init();
    obj.on ("batteryState", function(res){
      console.log("end");

      assert.equal(obj.info.uri,null,"Good Uri");
      assert.equal(obj.info.core, 0, "");
      assert.equal(obj.info.webGLRenderer, null, "");
      assert.equal(obj.info.webGLVendor, null, "");
      assert.equal(obj.info.webGLVersion, null, "");
      assert.equal(obj.info.webGLLanguage, null, "");
      assert.equal(obj.info.tabActiv, null, "");
      assert.equal(obj.info.hashCPUAverage, 0, "");
      assert.notEqual(obj.info.battery, null, "");
      assert.notEqual(res, null, "");
      done();
    });

    obj.getBatteryInfo();

});

QUnit.test('Test Side Effect getFocusInfo',function suite(assert) {
    var done = assert.async();
    var obj = init();
    obj.on ("tabActivState", function(res){
      assert.equal(obj.info.uri,null,"Good Uri")
      assert.equal(obj.info.core, 0, "");
      assert.equal(obj.info.webGLRenderer, null, "");
      assert.equal(obj.info.webGLVendor, null, "");
      assert.equal(obj.info.webGLVersion, null, "");
      assert.notEqual(obj.info.tabActiv, null, "");
      assert.equal(obj.info.hashCPUAverage, 0, "");
      assert.equal(obj.info.battery, null, "");
      assert.notEqual(res, null, "");
      done();
    });
    obj.getFocusInfo();

});


function init(){
  var obj = DataSniffer();
  obj.info.uri = null;
  obj.info.core = 0;
  obj.info.webGLRenderer = null;
  obj.info.webGLVendor = null;
  obj.info.webGLVersion = null;
  obj.info.webGLLanguage = null;
  obj.info.tabActiv = null;
  obj.info.hashCPUAverage = 0;
  obj.info.battery = null;
  return obj;
}
