// store/index.js
export const store = {
    state: {
      isLoading: false,
    },
    mutations: {
      showSpinner(state) {
        state.isLoading = true;
      },
      hideSpinner(state) {
        state.isLoading = false;
      },
    },
  };
  