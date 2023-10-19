<template>
  <v-card>
     
    <v-layout>
      <v-app-bar color="primary" prominent>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>

        <v-toolbar-title>panelAdmin</v-toolbar-title>

        <v-spacer></v-spacer>

         <router-link to="/">
          <v-btn variant="text" icon="mdi-home"></v-btn>
        </router-link>
         <v-btn variant="text" icon="mdi-chevron-left" @click="$router.back()"></v-btn>
      </v-app-bar>
  
      <v-navigation-drawer
        v-model="drawer"
        bottom
        theme="dark"
        position="right"
        permanent>
        <v-list color="transparent">
          <router-link to="/admin" exact>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              v-ripple
              title="Dashboard"
            ></v-list-item>
          </router-link>
          <router-link to="/admin/users" active-class="actives" >
            <v-list-item
              prepend-icon="mdi-account-box"
              title="مدیریت کاربران"
            ></v-list-item>
          </router-link>
          <router-link to="/admin/category" active-class="actives">
            <v-list-item
              prepend-icon="mdi-card-outline"
              title="دسته بندی ها"
            ></v-list-item>
          </router-link>
          <router-link to="/admin/post" active-class="actives">
            <v-list-item
              prepend-icon="mdi-file-outline"
              title="مدیریت پست ها"
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
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style>
a {
  color: white;
  text-decoration: none;
}
*{
  font-family: monospace;
}
.actives{
color: rgb(190, 86, 211);
}
</style>