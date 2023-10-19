<template>
  <div>
    <h1>افزودن پست جدید</h1>
    <hr />
    <v-form v-model="valid" class="elevation-5 mt-5 py-3 px-3">
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
          <v-textarea
            solo
            v-model="description"
            :rules="[(v) => !!v || 'توضیحات وارد کنید']"
            label="توضیحات"
            required
          >
          </v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <label>نویسنده</label>
          <select v-model="userId" class="custom-select">
            <option v-for="item in Getuser.users" :key="item" :value="item.userId">
              {{ item.fullName }}
            </option>
          </select>
        </v-col>
         <v-col cols="12" md="6">
          <label>دسته بندی</label>
          <select v-model="categoryId" class="custom-select">
            <option v-for="item in Getcategories.filter(f=>f.parentId == 0)" :key="item" :value="item.id">
             {{ item.title }}
            </option>
          </select>
        </v-col>
         <v-col cols="12" md="6">
          <label>زیر دسته بندی</label>
          <select v-model="subcategoryId" class="custom-select">
            <option v-for="item in Getcategories.filter(f=>f.parentId != 0)" :key="item" :value="item.id">
             {{item.title}}
            </option>
          </select>
        </v-col>
         <v-col cols="12" md="6">
          <v-switch
           color="primary"
            v-model="isSpecial"
            label="آیا این پست ویژه است؟"
          ></v-switch>
        </v-col>
        <v-col cols="12" md="6">
          <v-file-input
          v-model="files"
            label="File input"
            filled
             accept="image/png, image/jpeg, image/bmp" 
            prepend-icon="mdi-camera"
            :rules="[(v) => !!v || 'لطفا عکس را آپلود کنید']"
          ></v-file-input>
        </v-col>
       
      </v-row>

      <v-btn :disabled="!valid" @click="Addpost" color="success" class="mr-4">
        ثبت اطلاعات
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
export default {
  data() {
    return {
      valid: "",
      title: "",
      slug: "",
      description: "",
      userId: 0,
      categoryId: 0,
      subcategoryId: 0,
      isSpecial: false,
      files:[],
    };
  }, 
  created() {
    this.$store.dispatch("Getuser", { take: 100, pageId: 1 });
    this.$store.dispatch("Getcategories");
  },
  computed: {
    Getuser() {
      return this.$store.getters.Getuser;
    },
    Getcategories() {
      return this.$store.getters.Getcategories;
    },
  },
methods:{
  Addpost(){

  if(this.userId <= 0 || this.categoryId <= 0 ||this.subcategoryId <=0){
   toast.error("اطلاعات مورد نظر را وارد کنید");
    return;
  }



  const formData=new FormData();
  formData.append("Title",this.title)
  formData.append("Slug",this.slug)
  formData.append("Description",this.description)
  formData.append("UserId",this.userId.toString())
  formData.append("CategoryId",this.categoryId.toString())
  formData.append("SubCategoryId",this.subcategoryId.toString())
  formData.append("ImageFile",this.files[0])
  formData.append("IsSpecial",this.isSpecial.toString())
  this.$store.dispatch("addpost",formData).then(res=>{
    if(res.status == 200){
       toast.success("پست با موفقیت اضافه شد");
       this.$router.push('/admin/post')
    }
  }).catch((err) => {
     toast.error("عملیات با شکست مواجه شد");
  })
  }
}
};
</script>

<style>
.custom-select {
  width: 100%;
  border: 1px solid #808080a3;
  height: 50px;
  border-radius: 5px;
  background: #80808024;
}
</style>