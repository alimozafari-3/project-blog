<template>
  <div>
    <h1>{{ this.$route.query.q }}</h1>
    <v-row v-if="loding == false">
      <v-col cols="12" md="4" v-for="item in filterdata.posts" :key="item">
        <v-card class="mx-auto" max-width="344">
          <img
            :src="
              'https://blog-api.codeyad-project.ir/images/posts/' +
              item.imageName
            "
            alt=""
            style="width: 100%; height: 200px"
          />
          <v-card-title>{{ item.title }}</v-card-title>

          <v-card-subtitle>{{ item.category.title }}</v-card-subtitle>
          <router-link
            :to="{
              name: 'comment',
              params: { id: item.postId },
              query: { slug: item.slug },
            }"
          >
            <v-btn color="info" class="show-left mb-3 ml-3">Readmore</v-btn>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center" v-else>
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-alert
      v-if="filterdata.entityCount < 1"
      color="#C51162"
      dark
      icon="mdi-material-design"
      border="right"
      class="alertsearch"
    >
      موردی یافت نشود!</v-alert
    >
  </div>
</template>

<script>
import { Getpostsearch } from "../services/postservice";
export default {
  data() {
    return {
      filter: {
        pageId: 1,
        take: 10,
        title: this.$route.query.q,
        category: this.$route.query.category,
      },
      filterdata: {},
      loding: false,
    };
  },

  created() {
    this.loding = true;
    Getpostsearch(this.filter)
      .then((res) => {
        if (res.status == 200) {
          this.filterdata = res.data;
        }
        console.log(res.data);
      })
      .finally(() => {
        this.loding = false;
      });
  },
  computed: {
    queryq() {
      return [this.$route.query.q, this.$route.query.category];
    },
  },
  watch: {
    queryq: function () {
      this.loding = true;
      this.filter.title = this.$route.query.q;
      this.filter.category = this.$route.query.category;
      Getpostsearch(this.filter)
        .then((res) => {
          if (res.status == 200) {
            this.filterdata = res.data;
            console.log(res.data);
          }
        })
        .finally(() => {
          this.loding = false;
        });
    },
  },
};
</script>

<style>
.alertsearch {
  margin-top: 50px;
}
</style>