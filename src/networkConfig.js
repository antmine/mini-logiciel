/**
 * Class UrlConfig.
 *  [Object used to build request]
 */

function UrlConfig(h, po, pa) {
  this.host = h;
  this.port = po;
  this.path = pa;

  /**
   *  ~url function.~
   *  [This function is used to build the url request].
   * @return [url request]
   */
  this.url = function() {
    return "http://" + this.host + ":" + this.port + this.path;
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
    console.log(server + "  " + url);
    if (callBack == undefined) {
      return $.post(url, data);
    } else {
      $.post(url, data, callBack);
    }
  };
  /**
   *  ~url function.~
   *  [This function is used to send get http request].
   * @param server [server selection]
   * @param data [data]
   * @param callBack [callBack]
   */
  this.get = function(server, data, callBack) {
    var url = this.servers[server].url() + "/" + data;
    console.log(url);
    $.get(url, data, callBack);
  };

  this.servers = {};
  this.servers["analyse"] = new UrlConfig("127.0.0.1", "7890", "/user");
  this.servers["meta-data"] = new UrlConfig("127.0.0.1", "5000", "/data");

  return this;
}
