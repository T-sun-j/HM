import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";

const routes = [
  {
    path: "/haman",
    name: "haman",
    // redirect: '/haman',
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/haman.vue"),
    children: [
      {path: "/index",
      name: "index",
      // redirect: '/index',
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/index.vue"),
    },
      {
        path: "/productData",
        name: "productData",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/productData.vue"),
      },
      {
        path: "/productDetail",
        name: "productDetail",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/productDetail.vue"),
      },
      {
        path: "/productMarket",
        name: "productMarket",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/productMarket.vue"),
      },
      //productMarketDetail
      //marketDetail
      {
        path: "/productMarketDetail",
        name: "productMarketDetail",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/productMarketDetail.vue"),
      },
      {
        path: "/marketDetail",
        name: "marketDetail",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/marketDetail.vue"),
      },
      {
        path: "/case",
        name: "case",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/case.vue"),
      },
      //
      {
        path: "/caseDetail",
        name: "caseDetail",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/caseDetail.vue"),
      },
      {
        path: "/baike",
        name: "baike",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/baike.vue"),
      },
      {
        path: "/baikeDetail",
        name: "baikeDetail",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/baikeDetail.vue"),
      },
      {
        path: "/shop",
        name: "shop",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/shop.vue"),
      },
      {
        path: "/service",
        name: "service",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/service.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/login.vue"),
      },//loginDeal
      {
        path: "/loginDeal",
        name: "loginDeal",
        component: () =>
          import(/* webpackChunkName: "loginDeal" */ "../views/loginDeal.vue"),
      },
      {
        path: "/home",
        name: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/home.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/register.vue"),
      },
      {
        path: "/dealer",
        name: "dealer",
        component: () =>
          import(/* webpackChunkName: "dealer" */ "../views/dealer.vue"),
      },
      {
        path: "/dealerTab",
        name: "dealerTab",
        component: () =>
          import(/* webpackChunkName: "dealerTab" */ "../views/dealerTab.vue"),
      },
      {
        path: "/list",
        name: "list",
        component: () =>
          import(/* webpackChunkName: "list" */ "../views/list.vue"),
      },
      {
        path: "/result",
        name: "result",
        component: () =>
          import(/* webpackChunkName: "result" */ "../views/result.vue"),
      },
      
    ],
  },
  {
    path: "/pdf",
    name: "pdf",
    component: () =>
      import(/* webpackChunkName: "pdf" */ "../views/pdf.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
