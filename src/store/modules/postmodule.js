import axios from "../../utilities/axios";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  state: {
    posts: {},
  },
  getters: {
    Getpostfilter(state){
return state.posts
    }
  },
  mutations: {
    Setpostfilter(state, postfilter) {
      state.posts = postfilter;
    },
  },
  actions: {
    Getpostfilter(context,{pageId,take,title}){
      context.commit("Setisloding", true);
      return axios.get('api/post',{params:{pageId:pageId,take:take,title:title}})
      .then(res=>{
        if(res.status == 200){
          context.commit("Setpostfilter",res.data)
          console.log(res);
        }
      })
      .catch(()=>{
        toast.error("مشکلی در عملیات رخ داد");
      }).finally(()=>{
        context.commit("Setisloding", false);
      })
    },
    addpost(context,post){
      context.commit("Setisloding", true);
     return axios.post('api/post',post)
     .finally(()=>{
      context.commit("Setisloding", false);
     })
    },
    getpostbyId(context,id){
      context.commit("Setisloding", true);
     return axios.get('api/post/'+id)
     .finally(()=>{
      context.commit("Setisloding", false);
     })
    },
    Editepost(context,post){
      context.commit("Setisloding", true);
     return axios.put('api/post',post)
     .finally(()=>{
      context.commit("Setisloding", false);
     })
    },
    Deletepost(context,id){
      context.commit("Setisloding", true);
     return axios.delete('api/post/'+id)
     .finally(()=>{
      context.commit("Setisloding", false);
     })
    }
  },
};
