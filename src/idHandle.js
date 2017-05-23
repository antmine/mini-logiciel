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
    if (this.id == undefined)
      this.id = $.cookie("antmine_id");
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

    network.post("analyse", tmpInfo, function (res) {
      this.id = res.userID;
      console.log(res.userID);
      $.cookie("antmine_id", res.userID);

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
        eventEmiter.trigger("scripteExecute", [res]);
      }, function () {
        self.remove();
        self.connect(infoData, infoExt);
      });
    }
  }

  this.id = this.getId();

  return this;
}
