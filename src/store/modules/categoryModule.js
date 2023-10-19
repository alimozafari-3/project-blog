import { useToast } from "vue-toastification";
import axios from "../../utilities/axios";
const toast=useToast()
export default {
  state: {
    categories: [],
  },
  getters: {
    Getcategories(state){
       return state.categories
    }
  },
  mutations: {
    Setcategories(state, categories) {
        state.categories=categories
    },
  },
  actions: {
    Getcategories(context) {
      context.commit("Setisloding", true);
      axios.get("api/category")
        .then((res) => {
          context.commit("Setcategories",res.data);
          console.log(res.data);
       
        }).catch(()=>{
            toast.error("مشکلی در عملیات رخ داد");
        })
        .finally(() => {
          context.commit("Setisloding", false);
        });
    },
    GetAddcategory(context, category) {
      context.commit("Setisloding", true);
      return axios.post("api/category",category ).finally(() => {
        context.commit("Setisloding", false);
      });
    },
    GetEditecategory(context, edite) {
      context.commit("Setisloding", true);
      return axios.put("api/category",edite ).finally(() => {
        context.commit("Setisloding", false);
      });
    },
    GetcategorybyId(context, id) {
      context.commit("Setisloding", true);
      return axios.get("api/category/"+id ).finally(() => {
        context.commit("Setisloding", false);
      });
    },
    Getdeletecategory(context,id){
      context.commit("Setisloding", true);
      return axios.delete("api/category/"+id).finally(() => {
        context.commit("Setisloding", false);
      });
    }
  },
};
