<template>
  <div>
    <h1>لیست کاربران</h1>
    <hr />
    <router-link to="/admin/users/Adduser">
      <v-btn
        depressed
        color="success"
        class="mt-5"
        prepend-icon="mdi-plus-circle"
      >
        افزودن کاربر
      </v-btn>
    </router-link>
    <br />

    <v-table class="elevation-5 mt-5">
      <thead>
        <tr>
          <th class="text-right">نام کاربری</th>
          <th class="text-right">نام خانوادگی</th>
          <th class="text-right">نقش</th>
          <th class="text-right">عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Getuser.users" :key="item">
          <td>{{ item.userName }}</td>
          <td>{{ item.fullName }}</td>
          <td v-if="item.role == 1">ادمین</td>
          <td v-if="item.role == 0">کاربر</td>
          <router-link :to="'/admin/users/Edite/' + item.userId">
            <v-btn depressed color="info" class="mt-1"> ویرایش</v-btn>
          </router-link>
        </tr>
        <tr v-if="Getuser.entityCount == 0">
          <td>کاربری وجود ندارد</td>
        </tr>
      </tbody>
    </v-table>
    <div class="text-center mt-5">
      <v-pagination
        v-model="pageId"
        :length="Getuser.pageCount"
        :total-visible="7"
        next-icon="mdi-chevron-left"
        prev-icon="mdi-chevron-right"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageId:1
    }
  },
  computed: {
    Getuser() {
      return this.$store.getters.Getuser;
    },
  },
  watch:{
pageId:function(re){
   this.$store.dispatch("Getuser", { pageId: this.pageId, take: 7 });
}
  },
  created() {
    this.$store.dispatch("Getuser", { pageId: this.pageId, take: 7 });
  },
};
</script>