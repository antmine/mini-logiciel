function IdHandle () {
  this.id = undefined;

  this.getId = function() {
    if (this.id == undefined)
      this.id = $.cookie("antmine_id");
    return this.id;
  }

  this.setId = function(id) {
    this.id = id;
    $.cookie("antmine_id", this.id);
  }

  this.connect = function(info) {
    if (this.id == undefined) {
      $.post("http://127.0.0.1:7890/user", info, function(res) {
        this.setId(res.id);
      });
    } else {
      $.get("http://127.0.0.1:7890/user/" + this.id, function(data){
        console.log(data);
      });
    }
  }
}
