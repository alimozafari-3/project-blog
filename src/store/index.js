import { createStore } from 'vuex'
import usermodules from './modules/usermodules'
import categorymodules from './modules/categoryModule'
import postmodule from './modules/postmodule'
export default createStore({
  state: {
    isloding:false,
    
  },
  getters: {
   
  },
  mutations: {
    Setisloding(state,loding){
      state.isloding=loding
    },
  },
  actions: {
  },
  modules: {
    usermodules,
    categorymodules,
    postmodule
  }
})
