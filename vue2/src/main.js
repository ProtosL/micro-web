import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

let instance = null;
const render = () => {
  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount('#app-vue')
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
