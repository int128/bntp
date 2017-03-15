export default {
  get(uri, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', uri, true);
    req.onload = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          const data = JSON.parse(req.responseText);
          callback(data);
        } else {
          console.error(req.statusText);
        }
      }
    };
    req.onerror = () => console.error(req.statusText);
    req.send(null);
  }
}
