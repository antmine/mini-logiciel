QUnit.test('Test if the banner is display',function suite(assert) {
    assert.equal($('#antmine_content').length, 0, "");
    var objBannerHandle = new BannerHandle();

    objBannerHandle.display();

    console.log($('#antmine_content').length);
    assert.equal($('#antmine_content').length, 1, "");
});

QUnit.test('Test if the displayed banner desepear',function suite(assert) {
// TODO :: implementer function remove
});

QUnit.test('Test if the callBack (when the internet user accept antmine) works ',function suite(assert) {
  // TODO ::
});

QUnit.test('Test if the callBack (when the internet user don\'t accepte antmine) works ',function suite(assert) {
  // TODO ::
});
