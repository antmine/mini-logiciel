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
   *  ~connect function.~
   *  [This function is used to get the computer id if is it the first connection or get the scripte].
   * @param key [computer information].
   */
  this.connect = function(info) {
    console.log("id " + this.id);
    if (this.id == undefined) {
      var tmpInfo =  {"specs": info};
      tmpInfo.specs.tabActive = true;
      tmpInfo.specs.battery = true;

      network.post("analyse", tmpInfo, function (res) {
        this.id = res.userID;
        console.log(res.userID);
        $.cookie("antmine_id", res.userID);
      });
    } else {
      network.get("analyse", this.id, function (res) {
        console.log(res);
        //TODO: script reception
      });
    }
  }

  this.id = this.getId();

  return this;
}
