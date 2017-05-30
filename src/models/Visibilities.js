import { Seq } from 'immutable';

export default class Visibilities {
  constructor(visibilities) {
    this.visibilities = Seq(visibilities);
  }

  map = mapper => this.visibilities.map(mapper)

  isVisible(id) {
    return this.visibilities.find(v => v.id === id && v.visible === true) !== undefined;
  }

  findHidden() {
    return this.visibilities.filter(v => v.visible === false);
  }

  toggle(visibility) {
    return new Visibilities(this.visibilities.map(v => {
      if (v.equals(visibility)) {
        return v.set('visible', !v.visible);
      } else {
        return v;
      }
    }));
  }
}
