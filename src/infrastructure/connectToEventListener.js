class EventListenerConnector {
  subscriberCount = 0;
  eventListener = null;

  constructor(repository) {
    this.repository = repository;
  }

  subscribe(dispatcher) {
    if (this.subscriberCount === 0) {
      this.eventListener = this.repository.addListener(dispatcher);
      dispatcher();
    }
    this.subscriberCount++;
  }

  unsubscribe() {
    this.subscriberCount--;
    if (this.subscriberCount === 0) {
      this.repository.removeListener(this.eventListener);
    }
  }
}

const connectToEventListener = (repository, actionCreator) => {
  const connector = new EventListenerConnector(repository);
  return component => class SubscriberComponent extends component {
    componentWillMount() {
      if (super.componentWillMount) {
        super.componentWillMount();
      }
      connector.subscribe(() => this.props.dispatch(actionCreator()));
    }

    componentWillUnmount() {
      connector.unsubscribe();
      if (super.componentWillUnmount) {
        super.componentWillUnmount();
      }
    }
  };
}

export default connectToEventListener;
