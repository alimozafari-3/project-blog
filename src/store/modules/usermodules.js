import axios from "../../utilities/axios";
export default {
  state: {
    user: {},
  },
  getters: {
    Getuser(state) {
      return state.user;
    },
  },
  mutations: {
    Setuser(state, users) {
      state.user = users;
    },
  },
  actions: {
    Getuser(context, { take, pageId }) {
      context.commit("Setisloding", true);
      axios
        .get("api/user", { params: { take: take, pageId: pageId } })
        .then((res) => {
          context.commit("Setuser", res.data);
        })
        .finally(() => {
          context.commit("Setisloding", false);
        });
    },
    Getsingleuser(context, userId) {
      context.commit("Setisloding", true);
      return axios.get("api/user/" + userId).finally((f) => {
        context.commit("Setisloding", false);
      });
    },
    Editeuser(context, user) {
      context.commit("Setisloding", true);
      return axios.put("api/user", user).finally((f) => {
        context.commit("Setisloding", false);
      });
    },
    Adduser(context, user) {
      context.commit("Setisloding", true);
      return axios.post("api/user", user).finally((f) => {
        context.commit("Setisloding", false);
      });
    },
  },
};
