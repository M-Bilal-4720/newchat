import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ChatPage from './views/ChatPage.vue';
import Stream from './views/LiveStream.vue';
import Viewer from './views/ViewerPage.vue';
import MainChatComponent from "./components/MainChatComponent.vue";
import GroupChatComponent from "./components/GroupChatComponent.vue";
import MainStatusComponent from "./components/MainStatusComponent.vue";
import DefualtStatusComponent from "./components/DefualtStatusComponent.vue";
import DefualtChatComponent from "./components/DefualtChatComponent.vue";
// Define routes
const routes = [
    {name:"LoginPage", path: '/login', component: LoginPage },
    {name:"RegisterPage", path: '/register', component: RegisterPage },
    {path:'/stream',component: Stream , meta: { requiresAuth: true }},
    {name:"Viewer", path:'/view',component: Viewer , meta: { requiresAuth: true }},
    {
        name:"ChatPage",
        path: "/chat/",
        component: ChatPage,
        meta: { requiresAuth: true },
        children: [
            {name:'MainChat', path: "/main/:userId", component: MainChatComponent,  props: true, },
            {name:'DefaultChat', path: "/", component: DefualtChatComponent },
            {name:'GroupChat', path: "/group", component: GroupChatComponent },
            {name:'DefaultStatus', path: "status/default", component: DefualtStatusComponent },
            {name:'MainStatus', path: "status/main", component: MainStatusComponent },
        ],
    },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Add navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // Example check for authentication

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login'); // Redirect to login if not authenticated
    } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated) {
        next('/'); // Redirect to home if trying to access login or register while logged in
    } else {
        next(); // Proceed to the route
    }
});

export default router;
