import {App} from 'vue'
import {createRouter as createVueRouter, createWebHistory, Router} from 'vue-router'


import HelloWorld from './components/HelloWorld.vue'

export function createRouter(app: App): Router {
    const routes = [
        {
            path: '/',
            component: HelloWorld
        }
    ]

    return createVueRouter({
        history: createWebHistory(),
        routes
    })
}
