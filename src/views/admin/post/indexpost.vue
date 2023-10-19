<template>
  <div>
    <h1>مدیریت پست</h1>
    <hr />
    <router-link to="/admin/Addpost">
      <v-btn
        depressed
        color="success"
        class="mt-5"
        prepend-icon="mdi-plus-circle"
      >
        افزودن پست جدید</v-btn
      >
    </router-link>
    <br />

    <v-form class="elevation-5 mt-5 py-3 px-3">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="title"
            label="عنوان"
          
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="take"
            label="تعداد نمایش در صفحه"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn  color="info" class="mr-4" @click="postfilter">
        فیلتر
      </v-btn>
    </v-form>

    <v-table class="elevation-5 mt-5">
      <thead>
        <tr>
          <th class="text-right">عکس</th>
          <th class="text-right">عنوان</th>
          <th class="text-right">slug</th>
          <th class="text-right">نویسنده</th>
          <th class="text-right">عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Getpostfilter.posts" :key="item" >
          <td><img :src="'https://blog-api.codeyad-project.ir/images/posts/'+item.imageName" alt="" style="max-width:200px"></td>
          <td>{{ item.title }}</td>
          <td>{{ item.slug }}</td>
          <td>{{ item.userFullName }}</td>
          <td>
            <router-link :to="'/admin/Editepost/' + item.postId">
            <v-btn depressed color="info" > ویرایش</v-btn>
          </router-link>
          </td>
          <td><v-btn depressed color="error" @click="Deletepost(item.postId)"> حذف</v-btn></td>
        </tr>
        <tr v-if="Getpostfilter.entityCount === 0">
          <td>کاربری برای نمایش وجود ندارد</td>
        </tr>
      </tbody>
    </v-table>
      <div class="text-center mt-5">
    <v-pagination
      v-model="pageId"
      :length="Getpostfilter.pageCount"
      :total-visible="7"
      next-icon="mdi-chevron-left"
      prev-icon="mdi-chevron-right"
    ></v-pagination>
  </div>

  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
import Swal from "sweetalert2";
export default {
  data() {
    return {
      pageId: 1,
      take: 1,
      title: "",
    };
  },
 
  created() {
    this.$store.dispatch("Getpostfilter", {
      pageId: this.pageId,
      take: this.take,
      title: this.title,
    });
    
  },
  computed: {
    Getpostfilter() {
      return this.$store.getters.Getpostfilter;
    },
  },
    watch:{
    pageId:function(res){
    
      this.$store.dispatch("Getpostfilter", {
      pageId: this.pageId,
      take: this.take,
      title: this.title,
    });
    }
  },
  methods:{
    postfilter(){
       this.$store.dispatch("Getpostfilter", {
      pageId: this.pageId,
      take: this.take,
      title: this.title,
    });
    },
    Deletepost(id){
        Swal.fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "نه بیخیال",
      }).then(result=>{
        if(result.isConfirmed){
          this.$store.dispatch("Deletepost",id).then(res=>{
            if(res.status == 200){
              toast.success("حذف با موفقیت انجام شد");
              this.$store.dispatch("Getpostfilter", {pageId: this.pageId,take: this.take, title: this.title});
            }
          }).catch((err) => {
          if (err.response.data) {
            toast.error(err.response.data);
          } else {
            toast.error("مشکلی در عملیات رخ داد");
          }
        });
        }
      })

    }
  }
};
</script>