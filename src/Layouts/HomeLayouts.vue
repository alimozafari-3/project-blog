<template>
  <v-card>
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <router-link to="/">
          <v-toolbar-title>Blog</v-toolbar-title></router-link
        >
        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>
        <v-text-field
          v-model="searchvalue"
          label="جستوجو"
          type="search"
          class="mt-5"
          @keydown.enter="search()"
        ></v-text-field>

        <router-link to="/Admin">
          <v-btn variant="text" icon="mdi-account"></v-btn>
        </router-link>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        bottom
        theme="dark"
        position="right"
        permanent
      >
        <v-list color="transparent">
          <router-link  v-for="item in Getcategories.filter(f=>f.parentId == 0)" :key="item" :to="`/search?category=${item.title}`">
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              v-ripple
              :title="item.title"
            ></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 100vh">
        <div class="py-5 px-5">
          <router-view></router-view>
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    searchvalue: "",
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  created() {
    this.$store.dispatch("Getcategories");
  },
  computed: {
    Getcategories() {
      return this.$store.getters.Getcategories;
    },
  },
  methods: {
    search() {
      this.$router.push({name:"search",query:{q:this.searchvalue}});
    },
  },
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
* {
  font-family: unset;
}
</style>