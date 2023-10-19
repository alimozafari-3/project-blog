<template>
  <h1>پربازدید ترین مقالات</h1>
  <v-row>
    <v-col cols="12" md="4" v-for="item in posts" :key="item">
      <v-card class="mx-auto" max-width="344">
        <img
          :src="
            'https://blog-api.codeyad-project.ir/images/posts/' + item.imageName
          "
          alt=""
          style="width: 100%; height: 200px"
        />
        <v-card-title>{{ item.title }}</v-card-title>

        <v-card-subtitle>{{ item.category.title }}</v-card-subtitle>
        <router-link :to="{name:'comment',params:{id:item.postId},query:{slug:item.slug}}">
          <v-btn
            color="info"
            class="show-left mb-3 ml-3"
            >Readmore</v-btn
          >
        </router-link>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { Getpopularpost } from "../../services/postservice";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  data: () => ({
    posts: [],
  }),

  created() {
    this.$store.commit("Setisloding", true);
    Getpopularpost()
      .then((res) => {
        
        if (res.status == 200) {
          this.posts = res.data;
        }
      })
      .catch((err) => {
        toast.error("مشکلی در عملیات رخ داد");
      })
      .finally(() => {
        this.$store.commit("Setisloding", false);
      });
  },
};
</script>
<style >
.show-left {
  float: left;
}
</style>