import { createRouter, createWebHistory } from 'vue-router'

export class AppLaunch {
    views
    actions

    constructor (views, actions) {
        this.views = views
        this.actions = actions
    }

    /**
     * 初始化路由
     */
    initRouter = (app) => {
        const router = createRouter({
            history: createWebHistory(import.meta.env.BASE_URL),
            routes: [
                {
                    path: '/',
                    name: 'home',
                    component: app.component('HomeView')
                },
                {
                    path: '/about',
                    name: 'about',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: app.component('AboutView')
                },
            ],
        });
        app.use(router)
    }

    /**
     * 初始化views
     */
    initViews = (app) => {
        console.log(this.views)
        for (const view in this.views) {
            app.component(view, this.views[view])
        }
    }

    install (app) {
        this.initViews(app)
        this.initRouter(app)
    }
}

