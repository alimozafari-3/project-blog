<template>
  <div>
    <h1>ویرایش کاربر</h1>
    <hr />
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="6">
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="نام نام خانوادگی"
            required
          ></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-switch
            v-model="role"
            color="primary"
            label="ادمین"
            :value="1"
          ></v-switch>
          <v-switch
            v-model="role"
            color="primary"
            label="کاربر"
            :value="0"
          ></v-switch>
        </v-col>
      </v-row>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="editeuser">
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
    role: "",
    valid: "",
    name: "",
    nameRules: [
      (v) => !!v || "لطفا نام را وارد کنید",
      (v) => (v && v.length <= 20) || "تعداد کارکتر نباید بیشتر از 20 باشد",
    ],
  }),

  created() {
    this.$store.dispatch("Getsingleuser", this.$route.params.id).then((res) => {
      if (res.data.userName === undefined) {
        this.$router.push("/admin/users");
             toast.error("کاربری پیدا نشود");
      } else {
        this.name = res.data.fullName;
        this.role=res.data.role
      }
    });
  },
  methods:{
    editeuser(){
     this.$store.dispatch("Editeuser",{
      fullname:this.name,
      role:this.role,
      userId:this.$route.params.id
     }).then(res=>{
      if(res.status == 200){
         toast.success("عملیات با موفقیت انجام شد");
        this.$router.push("/admin/users")
      }
     }).catch((err) => {
       toast.error("مشکلی در عملیات رخ داد");
     })
    }
  }
};
</script>