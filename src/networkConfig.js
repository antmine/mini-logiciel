function UrlConfig (h, po, pa) {
  this.host = h;
  this.port = po;
  this.path = pa;
  this.url = function() {
    return "http://" + this.host + ":" + this.port + this.path;
  };
  return this;
}

function NetworkConfig () {
  this.post = function (server, data, callBack) {

    var url = this.servers[server].url();
    console.log(server + "  " + url);
    if (callBack == undefined) {
      return $.post(url, data);
    } else {
      $.post(url, data, callBack);
    }
  };

  this.get = function (server, data, callBack) {
    var url = this.servers[server].url() + "/" + data;
    console.log(url);
    $.get(url, data, callBack);
  };

  this.servers = {};
  this.servers["analyse"] = new UrlConfig("127.0.0.1", "7890", "/user");
  this.servers["meta-data"] = new UrlConfig("127.0.0.1", "5000", "/data");

  return this;
}
