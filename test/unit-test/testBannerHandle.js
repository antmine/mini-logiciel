QUnit.test('Test if the banner is display',function suite(assert) {
    if ($('#antmine_content').length > 0)
      $("#antmine_content").remove();
    assert.equal($('#antmine_content').length, 0, "");
    var objBannerHandle = new BannerHandle();

    objBannerHandle.display();

    console.log($('#antmine_content').length);
    assert.equal($('#antmine_content').length, 1, "");
    if ($('#antmine_content').length > 0)
      $("#antmine_content").remove();
});

QUnit.test('Test if the displayed banner desepear',function suite(assert) {
  if ($('#antmine_content').length > 0)
    $("#antmine_content").remove();
  assert.equal($('#antmine_content').length, 0, "");
  var objBannerHandle = new BannerHandle();

  objBannerHandle.display();

  assert.equal($('#antmine_content').length, 1, "");

  objBannerHandle.remove();

  assert.equal($('#antmine_content').length, 0, "");
  if ($('#antmine_content').length > 0)
    $("#antmine_content").remove();
});
/*
QUnit.test('Test if the callBack (when the internet user accept antmine) works ',function suite(assert) {
  if ($('#antmine_content').length > 0)
    $("#antmine_content").remove();
  var done = assert.async();
  var objBannerHandle = new BannerHandle();

  objBannerHandle.on("execScript", function() {
    assert.equal($('#antmine_content').length, 0, "");
    if ($('#antmine_content').length > 0)
      $("#antmine_content").remove();
    done();
  });

  objBannerHandle.display();

  assert.equal($('#antmine_content').length, 1, "");
  $("#antmine_start_script").trigger( "click" );
});
QUnit.test('Test if the callBack (when the internet user don\'t accepte antmine) works ',function suite(assert) {
  if ($('#antmine_content').length > 0)
    $("#antmine_content").remove();
  var done = assert.async();
  var objBannerHandle = new BannerHandle();

  objBannerHandle.on("stopScript", function() {
    assert.equal($('#antmine_content').length, 0, "");
    if ($('#antmine_content').length > 0)
      $("#antmine_content").remove();
    done();
  });

  objBannerHandle.display();

  assert.equal($('#antmine_content').length, 1, "");
  $("#antmine_stop_script").trigger( "click" );
});
*/
/*
QUnit.test('Test if the callBack (when the internet user accept antmine) works ',function suite(assert) {
  $("#antmine_banner").remove();
  var done = assert.async();
  setTimeout(function() {
    assert.fail();
    done();
  }, 30000);
  var objBannerHandle = new BannerHandle();
  alert("push on the \"yes\" button");
  objBannerHandle.on("execScript", function() {
    assert.equal($('#antmine_content').length, 0, "");
    $("#antmine_banner").remove();
    done();
  });
  objBannerHandle.on("stopScript", function() {
    assert.fail();
    assert.equal($('#antmine_content').length, 0, "");
    $("#antmine_banner").remove();
    done();
  });
});
QUnit.test('Test if the callBack (when the internet user don\'t accepte antmine) works ',function suite(assert) {
  $("#antmine_banner").remove();
  var done = assert.async();
  setTimeout(function() {
    assert.fail();
    done();
  }, 30000);
  var objBannerHandle = new BannerHandle();
  alert("push on the \"no\" button");

  objBannerHandle.on("execScript", function() {
    assert.fail();
    assert.equal($('#antmine_content').length, 0, "");
    $("#antmine_banner").remove();
    done();
  });
  objBannerHandle.on("stopScript", function() {
    assert.equal($('#antmine_content').length, 0, "");
    $("#antmine_banner").remove();
    done();
  });
});
*/
