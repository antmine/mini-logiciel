function UrlConfig (h, po, pa) {
  this.host = h;
  this.port = po;
  this.path = pa;
  this.url = function() {
    return this.host + ":" + this.port + this.path;
  };
  return this;
}

function NetworkConfig () {
  this.post = function (server, data, callBack) {
    if (callBack == undefined) {
      return $.post(this.servers[server].url(), data);
    } else {
      $.post(this.servers[server].url(), data, callBack);
    }
  };

  this.get = function (server, data, callBack) {
    $.get(this.servers[server].url() + data, callBack);
  };

  this.servers = {};
  this.servers["analyse"] = UrlConfig("127.0.0.1", "7890", "/user");
  this.servers["meta-data"] = UrlConfig("127.0.0.1", "5000", "/data");

  return this;
}
