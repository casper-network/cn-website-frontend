import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import PageFactory from '@/views/PageFactory.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/test',
    name: 'PageFactory',
    component: PageFactory,
  },
  {
    path: '/seo',
    name: 'SEO',
    component: () => import(/* webpackChunkName: "seo" */ '../views/seo.vue'),
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import(/* webpackChunkName: "team" */ '../views/about/Team.vue'),
  },
  {
    path: '/vision',
    name: 'OurVision',
    component: () => import(/* webpackChunkName: "vision" */ '../views/about/Vision.vue'),
  },
  {
    path: '/casper-universe',
    name: 'CasperUniverse',
    component: () => import(/* webpackChunkName: "universe" */ '../views/about/Universe.vue'),
  },
  {
    path: '/career',
    name: 'Career',
    component: () => import(/* webpackChunkName: "career" */ '../views/about/Career.vue'),
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "newsindex" */ '../views/news/index.vue'),
  },
  {
    path: '/news/:slug',
    name: 'NewsDetail',
    component: () => import(/* webpackChunkName: "newsdetail" */ '../views/news/detail.vue'),
  },
  {
    path: '/case-studies',
    name: 'CaseStudies',
    component: () => import(/* webpackChunkName: "caseStudies" */ '../views/casestudies/index.vue'),
  },
  {
    path: '/case-studies/:slug',
    name: 'CaseStudiesDetail',
    component: () => import(/* webpackChunkName: "caseStudiesDetail" */ '../views/casestudies/detail.vue'),
  },
  {
    path: '/ecosystem',
    name: 'EcoSystem',
    component: () => import(/* webpackChunkName: "ecosystem" */ '../views/ecosystem/index.vue'),
  },
  {
    path: '/ecosystem/:slug',
    name: 'EcoSystemDetail',
    component: () => import(/* webpackChunkName: "ecosystemdetail" */ '../views/ecosystem/_detail.vue'),
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "community" */ '../views/Community.vue'),
  },
  {
    path: '/documentation',
    name: 'Documentation',
    component: () => import(/* webpackChunkName: "documentation" */ '../views/Documentation.vue'),
  },
  {
    path: '/get-started',
    name: 'GetStarted',
    component: () => import(/* webpackChunkName: "newsletter" */ '../views/GetStarted.vue'),
  },
  {
    path: '/get-started-devs',
    name: 'GetStartedDevs',
    component: () => import(/* webpackChunkName: "getStartedDev" */ '../views/GetStartedDev.vue'),
  },
  {
    path: '/get-started-reg',
    name: 'GetStartedDefault',
    component: () => import(/* webpackChunkName: "getStartedReg" */ '../views/GetStartedReg.vue'),
  },
  {
    path: '/newsletter',
    name: 'Newsletter',
    component: () => import(/* webpackChunkName: "newsletter" */ '../views/Newsletter.vue'),
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: () => import(/* webpackChunkName: "newsletter" */ '../views/PrivacyPolicy.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return {
      x: 0,
      y: 0,
    };
  },
  routes,
});

export default router;
