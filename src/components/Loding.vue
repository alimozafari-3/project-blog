<template>
  <div class="loding" v-if="Getisloding">
    <v-progress-linear
      color="amber accent-4"
      indeterminate
      rounded
      height="6"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  computed: {
    Getisloding() {
      return this.$store.state.isloding;
    },
  },
};
</script>
<style>
.loding {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.27);
}
</style>