/**
 * Class UrlConfig.
 *  [Object used to build request]
 */

function UrlConfig(proto, h, po, pa) {
  this.proto = proto;
  this.host = h;
  this.port = po;
  this.path = pa;

  /**
   *  ~url function.~
   *  [This function is used to build the url request].
   * @return [url request]
   */
  this.url = function() {
    if (this.port == undefined) {
      return proto + "://" + this.host + this.path;
    } else {
      return proto + "://" + this.host + ":" + this.port + this.path;
    }
  };
  return this;
}

/**
 * Class NetworkConfig.
 *  [Controle the network communication]
 */
function NetworkConfig() {
  /**
   *  ~post function.~
   *  [This function is used to send post http request].
   * @param server [server selection]
   * @param data [data]
   * @param callBack [callBack]
   */
  this.post = function(server, data, callBack) {
    var url = this.servers[server].url();
    console.log(JSON.stringify(data));
    $.ajax({
      url:url,
      type:"POST",
      data:JSON.stringify(data),
      headers: {
        'Accept': '*/*',
        'Content-Type':'application/json',
      },
      dataType:"json",
      success: callBack
    });
  };
  /**
   *  ~url function.~
   *  [This function is used to send get http request].
   * @param server [server selection]
   * @param data [data]
   * @param callBack [callBack]
   */
  this.get = function(server, data, callBackSucced, callBackFail) {
    var url;
    if (data[0] == '/') {
      url = this.servers[server].url() + data;
    } else {
      var url = this.servers[server].url() + "/" + data;
    }
    console.log(url);
    $.get(url, callBackSucced).fail(callBackFail);
  };

  this.servers = {};
//  this.servers["analyse"] = new UrlConfig("analysis.antmine.io", "7890", "/user");
  this.servers["scripte"] = new UrlConfig("http", "analysis.antmine.io", undefined, "");
  this.servers["analyse"] = new UrlConfig("http", "analysis.antmine.io", undefined, "/users");
  this.servers["meta-data"] = new UrlConfig("http", "metadata.antmine.io", undefined, "/log");


  return this;
}
