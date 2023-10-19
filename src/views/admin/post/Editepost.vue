<template>
    <div>
         <h1>ویرایش پست</h1>
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
          <v-file-input
          v-model="files"
            label="File input"
            filled
             accept="image/png, image/jpeg, image/bmp" 
            prepend-icon="mdi-camera"
            :rules="[(v) => !!v || 'لطفا عکس را آپلود کنید']"
          ></v-file-input>
        </v-col>

         <v-col cols="12" md="6">
          <v-switch
           color="primary"
            v-model="isSpecial"
            label="آیا این پست ویژه است؟"
          ></v-switch>
        </v-col>
       
        <v-col cols="12" md="6">
          <img :src="'https://blog-api.codeyad-project.ir/images/posts/'+image" alt="" style="max-width:200px">
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
      categoryId: 0,
      subcategoryId: 0,
      isSpecial: false,
      files:[],
      image:"",
    // subcategoris:[],
      
    };
  }, 
  // watch:{
  //   categoryId:function(res){
  //    this.subcategoris=Getcategories.filter( f=> f.parentId == this.categoryId)
  //   }
  // },
  created() {
   this.$store.dispatch("getpostbyId",this.$route.params.id).then(res=>{
    if(res.status == 200){
        console.log(res);
        this.title=res.data.title
        this.slug=res.data.slug
        this.description=res.data.description
        this.categoryId=res.data.categoryId
        this.subcategoryId=res.data.subCategoryId
        this.isSpecial=res.data.isSpecial
        this.image=res.data.imageName
    }else {
         toast.error("مشکلی در عملیات رخ داد");
    }

   })
    this.$store.dispatch("Getcategories");
  },
  computed: {
    Getcategories() {
      return this.$store.getters.Getcategories;
    },
  },
methods:{
  Addpost(){

  if(this.categoryId <= 0 ||this.subcategoryId <=0){
   toast.error("اطلاعات مورد نظر را وارد کنید");
    return;
  }

  const formData=new FormData();
  formData.append("Title",this.title)
  formData.append("Slug",this.slug)
  formData.append("Description",this.description)
  formData.append("CategoryId",this.categoryId.toString())
  formData.append("SubCategoryId",this.subcategoryId.toString())
  formData.append("ImageFile",this.files[0])
  formData.append("IsSpecial",this.isSpecial.toString())
  formData.append("PostId",this.$route.params.id)


  this.$store.dispatch("Editepost",formData).then(res=>{
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