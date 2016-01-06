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
  get(name, defaultValue) {
    const value = localStorage.getItem(name);
    return (value === null) ? defaultValue : JSON.parse(value);
  },
  save(state) {
    Object.keys(state).forEach((key) =>
      localStorage.setItem(key, JSON.stringify(state[key]))
    );
  }
}
