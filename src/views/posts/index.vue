<template>
  <div class="elevation-8 v-container containerstyle">
    <img
      :src="'https://blog-api.codeyad-project.ir/images/posts/' + posts.imageName" alt=""
      class="img-single"
    />
    <v-divider></v-divider>
   <div>
     <h1>{{ posts.title }}</h1>
     <p>{{posts.description}}</p>
   </div>
     <v-divider></v-divider>
   <App-comment></App-comment>
  </div>
</template>

<script>
import { Getpostslug } from "../../services/postservice";
import comment from "../posts/comment.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  components:{"App-comment":comment},
  data() {
    return {
      posts: {},
    };
  },
  created() {
    this.$store.commit("Setisloding", true);
    Getpostslug(this.$route.query.slug)
      .then((res) => {
        if (res.status == 200) {
        
          this.posts = res.data;
        }
      })
      .catch((err) => {
        toast.error("مشکلی در عملیات رخ داد");
        this.$router.back();
      })
      .finally(() => {
        this.$store.commit("Setisloding", false);
      });
  },
};
</script>

<style >
    .img-single{
        width: 100%;
    max-height: 500px;
    }
    .containerstyle{
        width: 75%;
         max-height: 100%;
    }
</style>