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
    var prevState = self.info.battery;
    try {
      navigator.getBattery().then(function(result) {
        self.info.battery = result.charging;
        if (self.firstCall == true) {
          self.firstCall = false;
          eventEmiter.trigger("ready");
        } else if (prevState != self.info.battery) {
          eventEmiter.trigger("batteryState");
        }
      });
    } catch (err) {
      var battery;
      battery  = navigator.battery || navigator.mozBattery || navigator.webkitBattery;
      if (battery == undefined) {
        console.warn("Browser does not have battery info");
        self.info.battery = true;
      } else {
        self.info.battery = battery.charging;
      }
      if (self.firstCall == true) {
        self.firstCall = false;
        eventEmiter.trigger("ready");
      }
    }
  }

  /**
   *  ~check function.~
   *  [This function is used to check the windows status (displayed/not displayed)].
   */
  this.checkFocus = function() {
    var tmp = this.info.tabActive;
    this.info.tabActive = document.hasFocus();
    if (tmp != this.info.tabActive)
      eventEmiter.trigger("tabActiveState");
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

  this.firstCall = true;
  this.info = {};
  this.info.tabActive = document.hasFocus();
  this.info.battery = undefined;

//  this.loop();
}
