QUnit.test('Test to save Id',function suite(assert) {
  $.removeCookie("antmine_id");
  var objIdHandle = new IdHandle();

  objIdHandle.setId("test");

  var strTest = $.cookie("antmine_id");
  assert.equal(strTest, "test", "");
});

QUnit.test('Test to load Id',function suite(assert) {
  $.removeCookie("antmine_id");
  $.cookie("antmine_id", "test")
  var objIdHandle = new IdHandle();

  var strTest = objIdHandle.getId();

  assert.equal(strTest, "test", "");
  assert.equal(objIdHandle.id, "test", "");
});

QUnit.test('Test to load Id bis',function suite(assert) {
  $.removeCookie("antmine_id");
  var objIdHandle = new IdHandle();

  var strTest = objIdHandle.getId();

  assert.equal(strTest, undefined, "");
  assert.equal(objIdHandle.id, undefined, "");
});

QUnit.test('Test to remove Id',function suite(assert) {
  $.removeCookie("antmine_id");
  $.cookie("antmine_id", "test")
  var objIdHandle = new IdHandle();

  var strTest = objIdHandle.getId();

  assert.equal(objIdHandle.id, "test", "");

  objIdHandle.remove();

  var strTest = $.cookie("antmine_id");
  assert.equal(strTest, undefined, "");
  assert.equal(objIdHandle.id, undefined, "");
});

QUnit.test('Test all',function suite(assert) {
  var objIdHandle = new IdHandle();
  var strTest = "";

  objIdHandle.remove();

  strTest = $.cookie("antmine_id");
  assert.equal(strTest, undefined, "");
  assert.equal(objIdHandle.id, undefined, "");

  strTest = objIdHandle.getId();

  assert.equal(strTest, undefined, "");
  assert.equal(objIdHandle.id, undefined, "");

  objIdHandle.setId("test");

  strTest = $.cookie("antmine_id");
  assert.equal(strTest, "test", "");

  strTest = objIdHandle.getId();

  assert.equal(strTest, "test", "");
  assert.equal(objIdHandle.id, "test", "");

  objIdHandle.remove();

  strTest = $.cookie("antmine_id");
  assert.equal(strTest, undefined, "");
  assert.equal(objIdHandle.id, undefined, "");

});
