module.exports = {
  get: function (uri, callback) {
    var req = new XMLHttpRequest();
    req.open('GET', uri, true);
    req.onload = function () {
      if (req.readyState == 4) {
        if (req.status === 200) {
          var data = JSON.parse(req.responseText);
          callback(data);
        } else {
          console.error(req.statusText);
        }
      }
    };
    req.onerror = function () {
      console.error(req.statusText);
    };
    req.send(null);
  }
};
