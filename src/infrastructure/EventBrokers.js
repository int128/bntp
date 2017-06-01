class EventBroker {
  eventListener = null;

  constructor(publisher) {
    this.publisher = publisher;
  }

  subscribe(subscriber) {
    if (this.eventListener === null) {
      subscriber();
      const added = this.publisher.addListener(subscriber);
      this.eventListener = (added === undefined) ? subscriber : added;
    }
  }

  unsubscribe() {
    if (this.eventListener !== null) {
      this.publisher.removeListener(this.eventListener);
      this.eventListener = null;
    }
  }
}

export default class EventBrokers {
  constructor(publishers) {
    Object.keys(publishers).forEach(key => this[key] = new EventBroker(publishers[key]));
  }
}
