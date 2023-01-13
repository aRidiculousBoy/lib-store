import Vue from "vue";
import Vuex from "vuex";

// 导入模块
import permission from './modules/permission'
import user from './modules/user'
import file from './modules/file'


Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    permission,
    user,
    file
  },
});
