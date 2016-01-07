export default {
  getThemeName() {
    return localStorage.theme;
  },
  saveThemeName(name) {
    localStorage.theme = name;
  },
  getFolderCollapse(id) {
    return localStorage.getItem(`folder_${id}_collapse`) == 'collapse';
  },
  saveFolderCollapse(id, collapse) {
    if (collapse) {
      localStorage.setItem(`folder_${id}_collapse`, 'collapse');
    } else {
      localStorage.removeItem(`folder_${id}_collapse`);
    }
  },
  get(...keys) {
    const state = {};
    keys.forEach((key) => {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue !== undefined) {
        state[key] = JSON.parse(jsonValue);
      }
    });
    return state;
  },
  save(state) {
    Object.keys(state).forEach((key) =>
      localStorage.setItem(key, JSON.stringify(state[key]))
    );
  }
}
