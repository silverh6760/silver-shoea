function createStore() {
  const state = {
    isModalOpen: false,
    cartChanged: false,
    isLoading: false,
    sharedValue: "",
    cartId: null,
    confirmDelete: false,
  };
  const listeners = {};

  function setState(key, value) {
    state[key] = value;
    if (listeners[key]) {
      listeners[key].forEach((callback) => callback(value));
    }
  }

  function getState(key) {
    return state[key];
  }

  function subscribe(key, callback) {
    if (!listeners[key]) {
      listeners[key] = [];
    }
    listeners[key].push(callback);

    return function unsubscribe() {
      listeners[key] = listeners[key].filter((cb) => cb !== callback);
    };
  }

  return {
    setState,
    getState,
    subscribe,
  };
}

export const store = createStore();
