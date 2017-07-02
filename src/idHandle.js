/**
 * Class IdHandle.
 *  [Controle and save the computer id]
 */
function IdHandle() {
  /**
   *  ~getId function.~
   *  [This function is used to get the computer id in the cookie].
   * @return this.id [cumputer id]
   */
  this.getId = function() {
    if (this.id == undefined){
      this.id = $.cookie("antmine_id");
      console.log(this.id);
      if (this.id != undefined) {
        console.log('titi');
        eventEmiter.trigger("getId", [{"id": this.id, "new":false}]);
      }
    }
    return this.id;
  }

  /**
   *  -setId function.~
   *  [This function is used to set the computer id and save it in the cookie].
   * @param id [computer id].
   */
  this.setId = function(id) {
    this.id = id;
    $.cookie("antmine_id", this.id);
  }

  /**
   *  ~remove function.~
   *  [This function is used to remove the computer id in the cookie].
   */
  this.remove = function() {
    this.id = undefined;
    return $.removeCookie("antmine_id");
  }

  /**
   *  ~firstConnection function.~
   *  [This function is used to get the computer id if is it the first connection].
   * @param key [computer information].
   */
  this.firstConnection = function(infoData, infoExt) {
    var tmpInfo =  {"specs": infoData};
    tmpInfo.specs.tabActive = infoExt.tabActive;
    tmpInfo.specs.battery = infoExt.battery;
    var self = this;

    network.post("analyse", tmpInfo, function (res) {
      self.id = res.userID;
      eventEmiter.trigger("getId", [{"id": self.id, "new":true}]);
      console.log(res);
      $.cookie("antmine_id", res.userID);
      network.get("scripte", res.coin, function(res) {
        eventEmiter.trigger("scriptStart", [res]);
      }, function () {
        self.connect(infoData, infoExt);
      });
    });
  }

  /**
   *  ~connect function.~
   *  [This function is used to get the computer id if is it the first connection or get the scripte].
   * @param key [computer information].
   */
  this.connect = function(infoData, infoExt) {
    console.log("id " + this.id);
    if (this.id == undefined) {
      this.firstConnection(infoData, infoExt);
    } else {
      var self = this;
      network.get("analyse", this.id, function (res) {
        eventEmiter.trigger("scriptStart", [res]);
      }, function () {
        self.remove();
        self.connect(infoData, infoExt);
      });
    }
  }

  this.id = this.getId();

  return this;
}
