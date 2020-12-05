export function pollCharacter() {
  return new Promise(resolve => {
    const callback = e => {
      if (e.key.length === 1) {
        window.removeEventListener('keypress', callback);
        const key = e.key.toUpperCase();
        resolve(key);
      }
    };
    window.addEventListener('keypress', callback);
  });
}
