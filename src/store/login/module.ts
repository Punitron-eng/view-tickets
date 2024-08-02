import createActions from '@/store/login/actions'
import createMutations from '@/store/login/mutations'
const state = {
  LoginDetails: '',
  isLogin: false,
};
const login = () => ({
  namespaced: true,
  state,
  mutations: createMutations(),
  actions: createActions(),
});
export default login;