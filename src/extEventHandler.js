/**
 * Class ExtEventHandler.
 *  [detect the internaut action]
 */
function ExtEventHandler() {
  /**
   *  ~getBatteryInfo function.~
   *  [This function is used to know the state of batterie and trigger the "first" and the "batteryState" event].
   */
  this.getBatteryInfo = function() {
    var self = this;
    try {
      navigator.getBattery().then(function(result) {
        var prevState = self.info.battery;
        self.info.battery = result.charging;
        if (prevState == undefined) {
          eventEmiter.trigger("ready");
        } else if (prevState != self.info.battery)
          eventEmiter.trigger("batteryState");
      });
    } catch (err) {
      console.warn("Browser does not have battery info");
      self.info.battery ='error';
      if (prevState == undefined) {
        eventEmiter.trigger("ready");
      }
    }
  }
  
  /**
   *  ~check function.~
   *  [This function is used to check the windows status (displayed/not displayed)].
   */
  this.checkFocus = function() {
    var tmp = this.info.tabActiv;
    this.info.tabActiv = document.hasFocus();
    if (tmp != this.info.tabActiv)
      eventEmiter.trigger("tabActivState");
  }

  /**
   *  ~loop function.~
   *  [This function is used to get the battery state and the page state each 500 ms].
   */
  this.loop = function() {
    this.getBatteryInfo();
    this.checkFocus();
    var self = this;
    setTimeout(function() {
      self.loop();
    }, 500);
  }

  /**
   *  ~Anonymous function.~
   *  [This function is used to subscribe to the deconnexion event].
   */
  window.addEventListener("beforeunload", function (e) {
    eventEmiter.trigger("deconnection")
  });

  this.info = {};
  this.info.tabActiv = true;
  this.info.tabActiv = document.hasFocus();
  this.info.battery = undefined;
  this.loop();
}
