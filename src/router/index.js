import { createRouter, createWebHistory } from "vue-router";
// import HomeView from '../views/HomeView.vue'
import Admin from "../Layouts/AdminLayouts.vue";
import indexAdmin from "../views/admin/indexAdmin.vue";

import indexpage from "../views/admin/users/indexpage.vue";
import adduser from "../views/admin/users/Adduser.vue";
import edituser from "../views/admin/users/Edituser.vue";

import indexcategory from "../views/admin/categories/indexcategory.vue";
import Addcategory from "../views/admin/categories/Addcategory.vue";
import editecategory from "../views/admin/categories/Editecategory.vue";

import indexpost from "../views/admin/post/indexpost.vue";
import Addpost from "../views/admin/post/Addpost.vue";
import Editepost from "../views/admin/post/Editepost.vue";

import homelayouts from "../Layouts/HomeLayouts.vue";
import HomeView from "../views/posts/HomeView.vue";
import homepost from "../views/posts/index.vue";
import search from "../views/search.vue";
import notfound from "../views/notfound.vue";

const routes = [
  {
    path: "/",
    component: homelayouts,
    children: [
      {
        path: "",
        component: HomeView,
      },
      {
        path: "/post/:id",
        name:"comment",
        component: homepost,
      },
      {
        path: "/search",
        name:"search",
        component: search,
      },
    ],
  },

  {
    path: "/Admin",
    component: Admin,
    children: [
      {
        path: "",
        component: indexAdmin,
      },
      {
        path: "/admin/users",
        component: indexpage,
      },
      {
        path: "/admin/users/Adduser",
        component: adduser,
      },
      {
        path: "/admin/users/Edite/:id",
        component: edituser,
      },
      {
        path: "/admin/category",
        component: indexcategory,
      },
      {
        path: "/admin/Addcategory",
        name: "Addcategory",
        component: Addcategory,
      },
      {
        path: "/Admin/Editecategory/:id",
        component: editecategory,
      },
      {
        path: "/admin/post",
        component: indexpost,
      },
      {
        path: "/admin/Addpost",
        component: Addpost,
      },
      {
        path: "/admin/Editepost/:id",
        component: Editepost,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: notfound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
