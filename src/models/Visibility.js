import { Record } from 'immutable';

const VisibilityRecord = Record({
  id: null,
  title: null,
  visible: true,
});

export default class Visibility extends VisibilityRecord {
}
