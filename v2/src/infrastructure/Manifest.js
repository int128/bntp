export default class Manifest {
  static get() {
    const manifest = window.chrome.runtime.getManifest();
    manifest.id = window.chrome.runtime.id;
    return manifest;
  }
}
