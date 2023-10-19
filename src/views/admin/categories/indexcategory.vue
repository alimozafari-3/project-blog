<template>
  <div>
    <h1>لیست دسته بندی</h1>
    <hr />
    <router-link to="/admin/Addcategory">
      <v-btn
        depressed
        color="success"
        class="mt-5"
        prepend-icon="mdi-plus-circle"
      >
        افزودن دسته بندی</v-btn
      >
    </router-link>
    <br />

    <v-table class="elevation-5 mt-5">
      <thead>
        <tr>
          <th class="text-right">#</th>
          <th class="text-right">عنوان</th>
          <th class="text-right">slug</th>
          <th class="text-right">عملیات</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in Getcategories" :key="item">
          <td>{{ item.id }}</td>
          <td>
            <span>{{ item.title }}</span>
            <span v-if="item.parentId != 0">-{{ item.parentId }}</span>
          </td>
          <td>{{ item.slug }}</td>

          <td>
            <router-link :to="'/Admin/Editecategory/' + item.id">
              <v-btn depressed color="info" class="ml-1"> ویرایش</v-btn>
            </router-link>
            <v-btn
              depressed
              color="error"
              class="mr-1"
              @click="Deletecategory(item.id)"
              >حذف</v-btn
            >
            <router-link
              :to="{ name: 'Addcategory', query: { parentId: item.id } }"
            >
              <v-btn
                depressed
                color="info"
                class="mr-1"
                v-if="item.parentId == 0"
              >
                افزودن زیر گروه</v-btn
              >
            </router-link>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
const toast = useToast();
import Swal from "sweetalert2";
export default {
  created() {
    this.$store.dispatch("Getcategories");
  },
  computed: {
    Getcategories() {
      return this.$store.getters.Getcategories;
    },
  },
  methods: {
    Deletecategory(id) {
      Swal.fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "بله حذفش کن",
        cancelButtonText: "نه بیخیال",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store
            .dispatch("Getdeletecategory", id)
            .then((res) => {
              if (res.status == 200) {
                this.$store.dispatch("Getcategories");
                toast.success("حذف با موفقیت انجام شد");
              }
            })
            .catch((err) => {
              if (err.response.data) {
                toast.error(err.response.data);
              } else {
                toast.error("مشکلی در عملیات رخ داد");
              }
            });
        }
      });
    },
  },
};
</script>