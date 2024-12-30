import { useProfileStore } from "./stores/ProfileStore"
import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router"
import { getCurrentUser } from "vuefire"

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean
    requiresAuth: boolean
  }
}

const homeRoute =
  // (import.meta.env.VITE_APP_ID as AppIdType) === "drones"
  //   ? [
  //       {
  //         path: "/",
  //         component: () => import("./pages/HomeLangSelectionPage.vue"),
  //         meta: { requiresAuth: true },
  //       },
  //       {
  //         path: "/home",
  //         component: () => import("./pages/HomePageIntro.vue"),
  //         meta: { requiresAuth: true },
  //       },
  //     ]
  //   :
  [
    {
      path: "/",
      component: () => import("./pages/HomePage.vue"),
      meta: { requiresAuth: true },
    },
  ]

const routes: RouteRecordRaw[] = [
  ...homeRoute,
  {
    path: "/modules",
    component: () => import("./pages/ModulesPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/handbook",
    component: () => import("./pages/HandbookPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/training-modules",
    component: () => import("./pages/TrainingModulesPage.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/workspace", redirect: "/" },
  {
    path: "/login",
    component: () => import("./pages/LoginPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    component: () => import("./pages/RegisterPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/reset-password",
    component: () => import("./pages/ResetPasswordPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/set-password/:token",
    component: () => import("./pages/SetPasswordPage.vue"),
    meta: { requiresAuth: false },
    props: true,
  },
  {
    path: "/conversations/:action?/:id?",
    component: () => import("./pages/MessagesPage.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/settings",
    component: () => import("./pages/settings/SettingsPage.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: "profile",
        component: () => import("./pages/settings/ProfilePage.vue"),
        name: "Profile",
        meta: { requiresAuth: true },
      },
      {
        path: "products",
        name: "Products",
        component: () => import("./pages/settings/ProductsPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "certificates",
        name: "Certificates",
        component: () => import("./pages/settings/CertificatesPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/courses-material",
    component: () => import("./pages/courses-material/CoursesMaterialPage.vue"),
    meta: { requiresAuth: true },
    children: [
      { path: "", redirect: "/courses-material/videos" },
      {
        path: "files",
        component: () => import("./pages/courses-material/FilesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "videos",
        component: () => import("./pages/courses-material/VideosPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "articles",
        component: () => import("./pages/courses-material/ArticlesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "additional-resources",
        component: () =>
          import("./pages/courses-material/AdditionalResourcesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "various",
        component: () => import("./pages/courses-material/VariousPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: ":name(.*)",
        redirect: "/courses-material/videos",
      },
    ],
  },
  {
    path: "/sustainable-brands",
    component: () => import("./pages/SustainableBrandsPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/success-stories",
    component: () => import("./pages/SuccessStoriesPage.vue"),
    meta: { requiresAuth: true },
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser()
    if (!currentUser)
      return {
        path: "/login",
        query: { redirect: to.fullPath },
      }
    const profileStore = useProfileStore()
    const isProfileExists = await profileStore.isProfileExistsAsync()
    if (!isProfileExists && !to.path.includes("profile")) {
      return {
        path: "/settings/profile",
      }
    }
  }
})
