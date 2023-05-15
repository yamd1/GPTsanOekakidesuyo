import {App} from 'vue'
import {createRouter as createVueRouter, createWebHistory, Router} from 'vue-router'
import Oekaki from './pages/Oekaki.vue'


export function createRouter(app: App): Router {
    const routes = [
        {
            path: '/Oekaki',
            component: Oekaki
        }
    ]

    return createVueRouter({
        history: createWebHistory(),
        routes
    })
}
