/**
 * Class IdHandle.
 *  [Controle and save the computer id]
 */
function IdHandle () {
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
    $.removeCookie(this.id);
  }

  /**
   *  ~connect function.~
   *  [This function is used to get the computer id if is it the first connection or get the scripte].
   * @param key [computer information].
   */
  this.connect = function(info) {
    if (this.id == undefined) {
      $.post("http://127.0.0.1:7890/user", info, function(res) {
        this.id = res.id;
        $.cookie("antmine_id", this.id);
      });
    } else {
      $.get("http://127.0.0.1:7890/user/" + this.id, function(data){
        console.log(data);
      });
    }
  }

  this.id = undefined;

  return this;
}
