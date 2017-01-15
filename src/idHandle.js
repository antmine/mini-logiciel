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

}
