<template>
  <v-app>
    <v-main>
      <app-loding></app-loding>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import loding from './components/Loding.vue'
export default {
  name: "App",

 components:{
  'app-loding':loding
 }
};
</script>

<style>
.v-application {
  direction: rtl !important;
}
</style>