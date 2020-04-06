import Vue from 'vue'
import VueRouter from 'vue-router'
import ProvisionServiceView from '../views/ProvisionServiceView.vue'
import ComposeTemplateView from '../views/ComposeTemplate.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Provision',
        component: ProvisionServiceView
    },
    {
        path: '/templates',
        name: 'TemplateList',
        component: () => import(/* webpackChunkName: "TemplateList" */ '../views/TemplateListView.vue')
    },
    {
        path: '/templates/compose',
        name: 'TemplateCompose',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: ComposeTemplateView
    },
    {
        path: '/templates/:id/edit',
        name: 'TemplateEdit',
        component: ComposeTemplateView,
        props: true,
    },
    {
        path: '/resource_services',
        name: "ResourceServiceList",
        component: () => import(/* webpackChunkName: "ResourceServiceList" */ '../views/ResourceServiceListView.vue')
    },
    {
        path: '/resource_services/new',
        name: "ResourceServiceCreate",
        component: () => import(/* webpackChunkName: "ResourceServiceCreate" */ '../views/ResourceServiceCreateView.vue')
    },
    {
        path: '/services',
        name: "ServiceList",
        component: () => import(/* webpackChunkName: "ServiceList" */ '../views/ServiceListView.vue')
    },
    {
        path: '/services/new',
        name: "ServiceCreate",
        component: () => import(/* webpackChunkName: "ServiceCreate" */ '../views/ServiceCreateView.vue')
    },
    {
        path: '/nodes',
        name: 'NodeList',
        component: () => import(/* webpackChunkName: "Nodelist" */ '../views/NodeListView.vue')
    },
    {
        path: '/groups',
        name: 'GroupList',
        component: () => import(/* webpackChunkName: "GroupList" */ '../views/GroupListView.vue')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
