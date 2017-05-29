export default class EventListenerManager {
  eventListener = null;

  constructor(repository) {
    this.repository = repository;
  }

  subscribe(eventListener) {
    if (this.eventListener === null) {
      eventListener();
      const addedEventListener = this.repository.addListener(eventListener);
      if (addedEventListener === undefined) {
        this.eventListener = eventListener;
      } else {
        this.eventListener = addedEventListener;
      }
    }
  }

  unsubscribe() {
    if (this.eventListener !== null) {
      this.repository.removeListener(this.eventListener);
      this.eventListener = null;
    }
  }
}
