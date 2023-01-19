import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

let instance = null;
const render = () => {
    instance = createApp(App)
    instance.use(router)
        .mount('#app')
}

if (!window.__MICRO_WEB__) {
    render();
}

export const bootstrap = () => {
    console.log('bootstrap')
}

export const mount = () => {
    render();
    console.log('mount')
}

export const unmount = () => {
    console.log('unmount', instance)
}
