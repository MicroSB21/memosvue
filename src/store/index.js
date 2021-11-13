import { createStore } from 'vuex'

export default createStore({
  state: {
    acciones : []
  },
  mutations: {
    setAcciones(state, payload){
      state.acciones = payload
    }
  },
  actions: {
    async fetchAcciones({commit}){
      try {
        const res = await fetch('https://localhost:5001/api/accion');
        const data = await res.json();
        console.log(data);
        commit('setAcciones', data);
      } catch (error) {
        console.log(error);
      }
    }
  },
  modules: {
  }
})
