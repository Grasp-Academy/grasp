const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      guest: true,
      title: "Home",
      description: "",
    },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/admin",
    name: "admin",
    meta: {
      guest: true,
      title: "Admin Panel",
      description: "",
    },
    component: () => import("@/views/AdminView.vue"),
  },
  {
    path: "/courses",
    name: "courses",
    meta: {
      guest: true,
      title: "Courses",
      description: "",
    },
    component: () => import("@/views/CoursesView.vue"),
  },
  {
    path: "/course/:id?/:type?",
    name: "course",
    meta: {
      guest: true,
      title: "Category",
    },
    component: () => import("@/views/CourseView.vue"),
  },
  {
    path: "/creators",
    name: "creators",
    meta: {
      guest: true,
      title: "Creators",
      description: "",
    },
    component: () => import("@/views/CreatorsView.vue"),
  },
  {
    path: "/creator/:id?",
    name: "creator",
    meta: {
      guest: true,
      title: "Creator Profile",
    },
    component: () => import("@/views/CreatorView.vue"),
  },
  {
    path: "/category/:type?/:name?",
    name: "category",
    meta: {
      guest: true,
      title: "Category",
    },
    component: () => import("@/views/CourseView.vue"),
  },
  {
    path: "/marketplace/:name?",
    name: "marketplace",
    meta: {
      guest: true,
      title: "Marketplace",
    },
    component: () => import("@/views/MarketplaceView.vue"),
  },
  {
    path: "/nft/:collection?/:id?",
    name: "nft",
    meta: {
      guest: true,
      title: "NFT",
    },
    component: () => import("@/views/NftView.vue"),
  },
  {
    path: "/dashboard/:code?/:state?",
    name: "dashboard",
    meta: {
      guest: true,
      title: "Dashboard",
    },
    component: () => import("@/views/DashboardView.vue"),
    props: (route: { params: { code: any; state: any; }; query: { code: any; state: any; }; }) => ({
      code: route.params.code || route.query.code,
      state: route.params.state || route.query.state
    })
  },
  {
    path: "/my-courses",
    name: "my-courses",
    meta: {
      guest: true,
      title: "Courses",
    },
    component: () => import("@/views/MyCoursesView.vue"),
  },
  {
    path: "/my-course/:id?/:type?",
    name: "my-course",
    meta: {
      guest: true,
      title: "Course",
    },
    component: () => import("@/views/MyCourseView.vue"),
  },
  {
    path: "/my-lessons",
    name: "my-lessons",
    meta: {
      guest: true,
      title: "Lessons",
    },
    component: () => import("@/views/MyLessonsView.vue"),
  },
  {
    path: "/my-lesson/:id?/:type?",
    name: "my-lesson",
    meta: {
      guest: true,
      title: "Lesson",
    },
    component: () => import("@/views/MyLessonView.vue"),
  },
  {
    path: "/my-nfts",
    name: "my-nfts",
    meta: {
      guest: true,
      title: "EDU NFTs",
    },
    component: () => import("@/views/MyNftsView.vue"),
  },
  {
    path: "/my-nft/:id?/:type?",
    name: "my-nft",
    meta: {
      guest: true,
      title: "EDU NFT",
    },
    component: () => import("@/views/MyNftView.vue"),
  },
  {
    path: "/organisation",
    name: "organisation",
    meta: {
      guest: true,
      title: "Organisation",
    },
    component: () => import("@/views/MyOrganisationView.vue"),
  },
  {
    path: "/profile/",
    name: "profile",
    meta: {
      guest: true,
      title: "Profile",
    },
    component: () => import("@/views/MyUserView.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    meta: {
      guest: true,
      title: "Terms of Use",
    },
    component: () => import("@/views/TermsView.vue"),
  },
  {
    path: "/tokenomics",
    name: "tokenomics",
    meta: {
      guest: true,
      title: "Grasp Tokenomics",
    },
    component: () => import("@/views/TokenomicsView.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    meta: {
      guest: true,
      title: "Privacy Policy",
    },
    component: () => import("@/views/PrivacyView.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    meta: {
      guest: true,
      title: "404 Not Found",
    },
    component: () => import("@/views/ErrorNotFound.vue"),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/dashboard'
  }
];

export default routes;
