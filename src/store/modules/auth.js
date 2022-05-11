const state = () => ({
  token: null,
});

const getters = {
  token(state) {
    return state.token;
  },
};
const actions = {};
const mutations = {
  setToken(state, token) {
    state.token = token;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
