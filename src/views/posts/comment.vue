<template>
  <div>
    <v-form v-model="valid" class="mt-5">
      <v-row>
        <v-col cols="12">
          <v-textarea
            solo
            v-model="description"
            :rules="[(v) => !!v || 'نظر را وارد کنید']"
            label="نظر خود را ثبت کنید"
            required
          >
          </v-textarea>
        </v-col>
      </v-row>
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-3 mt-3"
        @click="Addcoments"
      >
        ثبت اطلاعات
      </v-btn>
    </v-form>

    <div v-if="getcomment.length >= 1">
      <div
        class="elevation-2 v-container mt-5 py-5"
        v-for="item in getcomment"
        :key="item"
      >
        <h4>
          {{ item.userFullName }}
          <small class="temdate">{{
            new Date(item.creationDate).toLocaleDateString("fa-IR")
          }}</small>
        </h4>
        <br />
        <p class="text-pre-wrap temtext">{{ item.text }}</p>
      </div>
    </div>
    <v-alert v-else border class="mt-5">برای این مقاله نظری ثبت نشوده</v-alert>
  </div>
</template>

<script>
import { Getcommet, addcommet } from "../../services/postservice";
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  data() {
    return {
      valid: "",
      description: "",
      getcomment: {},
    };
  },

  created() {
    this.$store.commit("Setisloding", true);
    Getcommet(this.$route.params.id)
      .then((res) => {
        if (res.status == 200) {
          this.getcomment = res.data;
          console.log(res);
        }
      })
      .finally(() => {
        this.$store.commit("Setisloding", false);
      });
  },
  methods: {
    Addcoments() {
      this.$store.commit("Setisloding", true);
      addcommet({
        userId: 1,
        postId: this.$route.params.id,
        text: this.description,
      })
        .then((res) => {
          if (res.status == 200) {
            toast.success("پست با موفقیت اضافه شد");
            Getcommet(this.$route.params.id).then((res) => {
              if (res.status == 200) {
                this.getcomment = res.data;
              }
            });
          } else {
            toast.error("مشکلی در عملیات رخ داد");
          }
        })
        .finally(() => {
          this.$store.commit("Setisloding", false);
        });
    },
  },
};
</script>
<style>
.temdate {
  font-size: 15px;
  color: rgba(204, 79, 25, 0.995);
  font-weight: 800;
}
.temtext {
  font-size: 15px;
  font-weight: 800;
  color: rgba(225, 154, 228, 0.995);
}
</style>