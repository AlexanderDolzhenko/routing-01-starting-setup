import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/pages/TeamsList.vue';
import UsersList from './components/pages/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/pages/NotFound.vue';
import TeamsFooter from './components/pages/TeamsFooter.vue';
import UsersFooter from './components/pages/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'teams', path: '/teams', meta: { needsAuth: true}, components: { default: TeamsList, footer: TeamsFooter }, children: [
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true },
            ]
        },
        {
            path: '/users', components: { default: UsersList, footer: UsersFooter }, beforeEnter(to, from, next) {
                next();
            }
        },

        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0 }
    }
});

router.beforeEach(function (to, from, next) {
    if(to.meta.needsAuth) {
        console.log('needs Auth!')
        next();
    } else {
        next()
    }
    //block users page
    // if (to.name === 'team-members') {
    //     next();
    // } else {
    //     next({ name: 'team-members', params: { teamId: 't2' } })
    // }
    
});

router.afterEach(function (to, from) {
    // send analytics data
    console.log(to, from)
});

const app = createApp(App)

app.use(router);

app.mount('#app');
