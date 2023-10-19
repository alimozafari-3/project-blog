<template>
  <div>
    <h1>افزودن کاربر جدید</h1>
    <hr />
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="addcategory"
      lazy-validation
    >
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="title"
            :counter="10"
            :rules="[(v) => !!v || 'عنوان را واردکنید']"
            label="عنوان"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="slug"
            :rules="[(v) => !!v || 'slug وارد کنید']"
            label="slug"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="metatag"
            :rules="[(v) => !!v || 'metatagوارد کنید']"
            label="metatag"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="metaDescription"
            :rules="[(v) => !!v || 'metaDescriptionوارد کنید']"
            label="metaDescription"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn type="submit" :disabled="!valid" color="success" class="mr-4">
        ثبت اطلاعات
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  data: () => ({
    valid: true,
    title: "",
    slug: "",
    metatag: "",
    metaDescription: "",
  }),

  methods: {
    addcategory() {
      let parentid=this.$route.query.parentId
      if(parentid == undefined){
        parentid=0
      }
      this.$store
        .dispatch("GetAddcategory", {
          title: this.title,
          slug: this.slug,
          metatag: this.metatag,
          metaDescription: this.metaDescription,
          parentId: parentid,
        })
        .then((res) => {
          if (res.status == 200) {
            toast.success("عملیات با موفقیت انجام شد");
            this.$router.push("/admin/category");
          }
        })
        .catch((err) => {
          toast.error("مشکلی در عملیات رخ داد");
        });
    },
  },
};
</script>