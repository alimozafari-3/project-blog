<template>
    <div>
        <h1>افزودن کاربر جدید</h1>
        <hr>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
        <v-col cols="12">
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="نام نام خانوادگی"
      required
    ></v-text-field>
    
    </v-col>
 <v-col cols="12" md="6">
    <v-text-field
      v-model="user"
      :rules="userRules"
      label="نام کاربری"
      required
    ></v-text-field>
    </v-col>
    <v-col cols="12" md="6">
 <v-text-field
      v-model="password"
      :rules="passwordRules"
      label="پسورد"
      required
    ></v-text-field>
 </v-col>

  </v-row>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'برای ادامه موافق هستید؟']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      ثبت اطلاعات
    </v-btn>

  </v-form>
  
    </div>
</template>

<script>
import { useToast } from 'vue-toastification';
const toast=useToast()

export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'لطفا نام را وارد کنید',
        v => (v && v.length <= 20) || 'تعداد کارکتر نباید بیشتر از 20 باشد',
      ],
      user: '',
      userRules: [
       v => !!v || 'لطفا نام  کاربری را وارد کنید',
        v => (v && v.length <= 10) || 'تعداد کارکتر نباید بیشتر از 10 باشد',
      ],
      password:"",
    passwordRules:[
      v=>!!v || 'رمز عبور را وارد کنید',
      v=>v.length > 4 || 'کلمه عبور بیشتر از 4 کارکترباشد'
    ],

      checkbox: false,
    }),

    methods: {
      validate () {
      this.$store.dispatch("Adduser",{
        fullName:this.name,
        userName:this.user,
        password:this.password
      
      }).then(res=>{
       if(res.status === 200){
        toast.success("عملیات با موفقیت انجام شد");
        this.$router.push("/admin/users")
       }
      }).catch((err) => {
        toast.error("مشکلی در عملیات رخ داد");
      })
      },
    
    },
}
</script>